import { Component, OnInit } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.scss']
})
export class ProductAddPageComponent implements OnInit {
  isSubmit = false;
  form!: FormGroup;
  constructor(
    private dom: DomService,
    private fb: FormBuilder,
    private product: ProductService
  ) {
    this.dom.page.title.text = 'Añadir Producto';
    this.dom.page.title.redirect = '/add/product';
    this.dom.page.menu.add = false;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      cantidad: [1, [Validators.required]]
    });
  }

  ngOnInit(): void {
    document.title = 'Añadir Producto';
  }

  submit(): void{
    this.isSubmit = true;
    if (this.form.valid) {
      this.product.createProduct(this.form.value).finally(() => {
        this.isSubmit = false;
      });
    } else {
      this.isSubmit = false;
    }
  }

}
