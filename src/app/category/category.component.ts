import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public cat: UserService) { }

  catArray:any[]=[]

  ngOnInit(): void {
    this.cat.getCategories().subscribe((data:any[])=>{

      this.catArray = data

    }) 
  }



}
