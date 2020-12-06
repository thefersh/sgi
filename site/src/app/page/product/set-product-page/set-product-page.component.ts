import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { DomService } from 'src/app/services/dom.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GetInfoInterface, GetCategoryInterface, FeacturesExistItemInterface } from 'src/app/interface/product.service.interface';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-set-product-page',
  templateUrl: './set-product-page.component.html',
  styleUrls: ['./set-product-page.component.scss']
})
export class SetProductPageComponent implements OnInit {
  createForm!: FormGroup;
  selectForm!: FormGroup;
  fForm!: FormGroup;
  feacturesExistItem: FeacturesExistItemInterface[] = [];
  isSubmit: {[index: string]: boolean} = {
    select: false,
    create: false,
    feacturesNew: false,
    selectContinue: false,
    createContinue: false,
    feacturesNewContinue: false
  };
  notFound = false;
  categorys: GetCategoryInterface[] = [];
  data: GetInfoInterface = {
    id: '',
    title: '',
    description: '',
    price: 0
  };
  complete = false;
  type = '';

  routerSubscrive: any;

  constructor(
    private product: ProductService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private dom: DomService,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({name: ['', [Validators.required, Validators.minLength(3)]]});
    this.selectForm = this.fb.group({asign: ['', [Validators.required]]});
    this.fForm = this.fb.group({f: this.fb.array([])});
    this.routerSubscrive = this.router.events.subscribe(r => {
      if (r instanceof NavigationEnd){
        this.reload();
      }
    });
  }

  ngOnInit(): void {}

  reload(): void {
    this.product.getInfo(this.aRouter.snapshot.params.id).then(d => {
      this.data = d;
      if (this.dom.getParams.type){
        switch (this.dom.getParams.type){
          case 'feactures':
            this.product.getFeactures(this.aRouter.snapshot.params.id).then(r => this.feacturesExistItem = r);
            this.dom.page.title.text = 'Agregar o Cambiar Caracteristicas';
            this.dom.page.title.redirect = `/product/${this.aRouter.snapshot.params.id}/set`;
            this.dom.page.menu.add = true;
            document.title = `${d.title} - Agregar o Cambiar Caracteristicas`;
            break;
          case 'category':
            this.product.getCategory().then(r => this.categorys = r);
            this.dom.page.title.text = 'Cambiar Categoria';
            this.dom.page.title.redirect = `/product/${this.aRouter.snapshot.params.id}/set`;
            this.dom.page.menu.add = true;
            document.title = `${d.title} - Cambiar Categoria`;
            break;
          default:
            this.dom.notification('No se encuentra la acción');
            break;
        }
        this.type = this.dom.getParams.type;
      }else {
        this.router.navigate([`/product/${this.aRouter.snapshot.params.id}`]);
      }
    }).catch(() => this.notFound = true);
    if (this.dom.getParams.complete){
      this.complete = true;
    }
  }

  fFormAdd(): void {
    this.fFormF.push(this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', Validators.required]
    }));
  }
  fFormRemove(i: number): void {
    this.fFormF.removeAt(i);
  }

  get fFormF(): FormArray{
    return (this.fForm.controls.f as FormArray);
  }

  submitDeleteFeacture(id: number): void {
    this.product.deleteFeacture(
      this.feacturesExistItem[id].id,
      this.feacturesExistItem[id].name
    ).then(() => this.feacturesExistItem.splice(id, 1));
  }

  submitEditFeacture(id: string, domId: number): void {
    const name = (document.getElementById(`reactName${domId}`) as HTMLInputElement).value;
    const value = (document.getElementById(`reactValue${domId}`) as HTMLInputElement).value;
    const item = this.feacturesExistItem[domId];
    this.product.changeFeactures(id, {
      ...(item.name !== name ? {name} : {}),
      ...(item.value !== value ? {value} : {})
    }).then(() => {
      if (item.name !== name) {
        this.feacturesExistItem[domId].name = name;
      }
      if (item.value !== value) {
        this.feacturesExistItem[domId].value = value;
      }
      this.feacturesExistItem[domId].isEdit = false;
    }).catch(() => this.feacturesExistItem[domId].isEdit = false);
  }

  submitFeacturesNew(isSubmit: string): void {
    this.isSubmit[isSubmit] = true;
    if (this.fFormF.valid) {
      // tslint:disable-next-line: prefer-const
      let data: any[] = [];
      for (let x = 0; this.fFormF.value.length > x; x++) {
        data.push({
          uidProduct:  this.aRouter.snapshot.params.id,
          ...this.fFormF.value[x]
        });
      }
      console.log(isSubmit);
      this.product.submitFeacturesNew(
        data,
        this.aRouter.snapshot.params.id,
        ...(isSubmit === 'feacturesNewContinue' ? this.aRouter.snapshot.params.id : '')
      ).finally(() => this.isSubmit[isSubmit] = false);
    } else {
      this.isSubmit[isSubmit] = false;
    }
  }


  submitSelectCategory(isSubmit: string): void {
    this.isSubmit[isSubmit] = true;
    if (this.selectForm.valid) {
      this.isSubmit[isSubmit] = true;
      this.product.slelectCategory({
        ...this.selectForm.value,
        ...(isSubmit === 'selectContinue' ? {id: this.aRouter.snapshot.params.id} : {})
      }, this.aRouter.snapshot.params.id).finally(() => this.isSubmit[isSubmit] = false);
    } else {
      this.isSubmit[isSubmit] = false;
      this.dom.notification('Rellene los datos');
    }
  }

  submitCreateCategory(isSubmit: string): void {
    this.isSubmit[isSubmit] = true;
    if (this.createForm.valid) {
      this.isSubmit[isSubmit] = true;
      this.product.createCategory({
        ...this.createForm.value,
        ...(isSubmit === 'createContinue' ? {id: this.aRouter.snapshot.params.id} : {})
      }, this.aRouter.snapshot.params.id).finally(() => this.isSubmit[isSubmit] = false);
    } else {
      this.isSubmit[isSubmit] = false;
      this.dom.notification('Rellene los datos');
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.routerSubscrive.unsubscribe();
  }

}
