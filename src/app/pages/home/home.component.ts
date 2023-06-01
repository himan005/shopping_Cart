import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT : { [id:number]:number }= { 1:400, 3: 335, 4:350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
cols = 3;
rowHeight = ROWS_HEIGHT[this.cols];
category: string | undefined;
products: any
sort = 'desc';
count ='12';
productsSubscription: Subscription | undefined;
searchKey:string="";

unsubscribe$ = new Subject()

  constructor(
    private cartService: CartService, 
    private storeService: StoreService
    ) { }
  

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.storeService.getAllProducts(this.count, this.sort,
      this.category).pipe(takeUntil(this.unsubscribe$))
      .subscribe((_products) => {
        this.products = _products;
      });
      this.cartService.search.subscribe((val:any) =>{
        this.searchKey = val
      })   
  }

  onColumnsCountChange(colsNum  : number):void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum]
    
    }

  onShowCategory(newCategory:string):void{
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id

    });
  }
  // Getting the products depending on the count
  onItemsCountChange(newCount: number): void{
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void{
    this.sort = newSort
    this.getProducts();
  }
  ngOnDestroy(): void{
    this.unsubscribe$.next('')
    this.unsubscribe$.complete()
  }

}
