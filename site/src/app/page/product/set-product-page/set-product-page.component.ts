import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { DomService } from 'src/app/services/dom.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GetInfoInterface, GetCategoryInterface } from 'src/app/interface/product.service.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-product-page',
  templateUrl: './set-product-page.component.html',
  styleUrls: ['./set-product-page.component.scss']
})
export class SetProductPageComponent implements OnInit {
  createForm!: FormGroup;
  selectForm!: FormGroup;
  isSubmit: {[index: string]: boolean} = {
    select: false,
    create: false,
    selectContinue: false,
    createContinue: false,
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

  constructor(
    private product: ProductService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private dom: DomService,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({name: ['', [Validators.required, Validators.minLength(3)]]});
    this.selectForm = this.fb.group({asign: ['', [Validators.required]]});
    this.reload();
    this.router.events.subscribe(r => {
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
            this.dom.page.title.text = 'Cambiar Caracteristicas';
            this.dom.page.title.redirect = `/product/${this.aRouter.snapshot.params.id}/set`;
            this.dom.page.menu.add = false;
            document.title = `${d.title} - Cambiar Caracteristicas`;
            break;
          case 'category':
            this.product.getCategory().then(r => this.categorys = r);
            this.dom.page.title.text = 'Cambiar Categoria';
            this.dom.page.title.redirect = `/product/${this.aRouter.snapshot.params.id}/set`;
            this.dom.page.menu.add = false;
            document.title = `${d.title} - Cambiar Categoria`;
            break;
          default:
            this.dom.notification('No se encuentra la acción');
            break;
        }
        this.type = this.dom.getParams.type;
      }
    }).catch(() => this.notFound = true);
    if (this.dom.getParams.complete){
      this.complete = true;
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

}
