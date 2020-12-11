import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { GetProductinfoInterface, GetProductFeacturesInterface, GetProductGaleryInterface } from 'src/app/interface/app.service.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewProductComponent implements OnInit {
  productInfo: GetProductinfoInterface = {name: 'Cargando...', description: 'Cargando...'};
  img: SafeResourceUrl = '';
  feactures: GetProductFeacturesInterface[] = [];
  galery: GetProductGaleryInterface[] = [];
  descriptionEdit = false;
  stockCount = 1;

  /** Formularios */
  formDescription!: FormGroup;
  formFeactures!: FormGroup;
  inputFile!: File;

  /** progeso de subida */
  progress = 0;

  constructor(
    private app: AppService,
    private product: ProductService,
    public activatedRoute: ActivatedRoute,
    private sanatiser: DomSanitizer,
    private fb: FormBuilder,
    private dom: DomService
  ) {
    this.dom.page.title.text = 'Sgi';
    this.dom.page.title.redirect = '/';
    this.dom.page.menu.add = true;
    window.scrollTo(0, 0);
    this.formDescription = this.fb.group({d: ['', [Validators.required, Validators.maxLength(300)]]});
    this.formFeactures = this.fb.group({f: this.fb.array([])});
    this.app.getProductinfo(this.activatedRoute.snapshot.params.id).then(r => {
      this.productInfo = r || {};
      document.title = `${r.name} - sgi`;
      this.app.getProductOutstandingImage(this.activatedRoute.snapshot.params.id)
        .then(res => this.img = this.sanatiser.bypassSecurityTrustResourceUrl(res));
      this.app.getProductFeactures(this.activatedRoute.snapshot.params.id).then(res => this.feactures = res);
      this.app.getProductGalery(this.activatedRoute.snapshot.params.id)
        .then(res => res.forEach(x => this.galery.push({
          alt: x.alt,
          url: this.sanatiser.bypassSecurityTrustResourceUrl(x.url as string),
          id: x.id,
          type: x.type,
          default: x.default
        })));
      this.app.getProductCountStock(this.activatedRoute.snapshot.params.id)
        .then(res => this.stockCount = res).catch(() => this.stockCount = 0);
    });
  }

  ngOnInit(): void {
  }

  toggleDescriptionEdit(i: boolean): void {
    if (i) {
      this.formDescription.controls.d.setValue(this.productInfo.description);
      this.descriptionEdit = true;
    }else{
      this.formDescription.controls.d.reset();
      this.descriptionEdit = false;
    }
  }

  uploadGalery(): void {
    const form = new FormData();
    const input = (document.getElementById('galeryInput') as HTMLInputElement);
    form.append('id', this.activatedRoute.snapshot.params.id);
    form.append('file', this.inputFile);
    if (this.galery.length === 0) {
      form.append('default', 'true');
    }
    this.app.createProductGalery(form, this.activatedRoute.snapshot.params.id).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / (event.total as number));
        }
        if (event instanceof HttpResponse) {
          if (event.body?.data) {
            this.progress = 0;
            event.body?.data.forEach(x => {
              this.galery.push({
                id: x.id,
                alt: x.alt,
                url: x.url,
                type: x.type,
                default: x.default
              });
              if (x.default) {
                this.img = this.sanatiser.bypassSecurityTrustResourceUrl(x.url as string);
              }
            });
          }
          if (event.body?.err) {
            alert(event.body.err);
          }
        }
      },
      (err) => console.error(err)
    );
  }

  changeGaleryEvent(e: any): void{
    this.inputFile = e.target.files[0];
    e.target.value = '';
    this.uploadGalery();
  }

  deleteFeacture(id: number): void {
    this.product.deleteFeacture(
      this.feactures[id].id,
      this.feactures[id].name
    ).then(() => this.feactures.splice(id, 1)).catch(() => this.feactures[id].edit = false);
  }

  changeFeacture(id: string, index: number): void {
    const name = (document.getElementById(`reactName${index}`) as HTMLInputElement).value;
    const value = (document.getElementById(`reactValue${index}`) as HTMLInputElement).value;
    const item = this.feactures[index];
    this.product.changeFeactures(id, {
      ...(item.name !== name ? {name} : {}),
      ...(item.value !== value ? {value} : {})
    }).then(() => {
      if (item.name !== name) {
        this.feactures[index].name = name;
      }
      if (item.value !== value) {
        this.feactures[index].value = value;
      }
      this.feactures[index].edit = false;
    }).catch(() => this.feactures[index].edit = false);
  }

  /** Form Submit */
  formDescriptionSubmit(): void{
    this.app.updateDescription(this.formDescription.controls.d.value, this.activatedRoute.snapshot.params.id)
      .then(r => {
        this.productInfo.description = this.formDescription.controls.d.value;
        this.toggleDescriptionEdit(false);
      });
  }

  formFeacturesSubmit(): void {
    if (this.formFeacturesFArray.valid) {
      // tslint:disable-next-line: prefer-const
      let data: any[] = [];
      this.formFeacturesFArray.controls.forEach((x) => {
        data.push({
          uidProduct:  this.activatedRoute.snapshot.params.id,
          ...x.value
        });
      });
      this.app.createProductFeactures(data, this.activatedRoute.snapshot.params.id)
        .then(res => {
          res.forEach(x => this.feactures.push(x));
          this.formFeacturesFArray.controls.forEach((x, i) => this.formFeacturesDeleteItem(i));
        });
    }else {
      alert('Rellene Correctamente los datos');
    }
  }

  /** Form Action */
  formFeacturesDeleteItem(i: number): void {
    this.formFeacturesFArray.removeAt(i);
  }

  formFeacturesAddItem(): void {
    this.formFeacturesFArray.push(this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  /** Form Get */
  get formFeacturesFArray(): FormArray {
    return this.formFeactures.controls.f as FormArray;
  }

}
