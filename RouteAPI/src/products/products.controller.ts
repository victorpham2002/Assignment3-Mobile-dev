import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import * as ROUTELIST from './Station.json'
import * as ROUTEDETAIL from './StationDetail.json'
import * as NOTFOUND from './Notfound.json'

// localhost:3000/products
@Controller('routes')
export class ProductsController {
  // GET /products
  @Get()
  getAllProducts() {
    return ROUTELIST;
  }

  // GET /products/:id
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    for (let index = 0; index < ROUTEDETAIL.length; ++index) {
      if (ROUTEDETAIL[index]["RouteNo"] == prodId) {
        return ROUTEDETAIL[index];
      } 
    }
    return NOTFOUND;
  }
}
