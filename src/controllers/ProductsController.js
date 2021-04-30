import { PRODUCTS_DB } from "../models/database-simulation/Products";

export class ProductsController {

    static async getProductById(id) {
        const idExist = false;
        const product =
            await new Promise((resolve, reject) => {
                PRODUCTS_DB.forEach(element => {
                    if( element.id == id){
                        resolve(element)
                        idExist = true;
                    }
                });
                if( idExist == false){
                    reject("Id not founded");
                }
            });
        return product;
    }

    static async getAllProducts() {
        const products =
            await new Promise((resolve, reject) => {
                if (PRODUCTS_DB.length > 0) {
                    resolve(PRODUCTS_DB)
                }
                else {
                    reject("No products found");
                }
            });
        return products;
    }

    static async getAllProductsBySection(section) {
        const products =
            await new Promise((resolve, reject) => {
                if (PRODUCTS_DB.length > 0) {
                    let sectionProducts = PRODUCTS_DB.filter(value =>
                        value.section.toLowerCase() == section.toLowerCase()
                    )
                    if (sectionProducts.length > 0) {
                        resolve(sectionProducts)
                    }
                    else{
                        reject("Section not founded");
                    }
                }
                else {
                    reject("Section not founded");
                }
            });
        return products;
    }
}