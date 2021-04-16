import { PAGE_ROUTES } from "./PageRoutes";

export const CATEGORIES =
[
    {
        name:"String",
        subcategories:[
            {name:"Guitars", link:PAGE_ROUTES.products.guitars},
            {name:"Basses", link:PAGE_ROUTES.products.basses},
            {name:"Violins", link:PAGE_ROUTES.products.violins},
            {name:"Pianos", link:PAGE_ROUTES.products.pianos},

            
        ]
    }
    ,    
    {
        name:"Wind",
        subcategories:[
            {name:"Saxophones", link:PAGE_ROUTES.products.saxophones},
            {name:"Trumpets", link:PAGE_ROUTES.products.trumpets},
            {name:"Flutes", link:PAGE_ROUTES.products.flutes},
            {name:"Clarinet", link:PAGE_ROUTES.products.clarinets},
        ]
    },
    {
        name:"Percussion",
        subcategories:[
            {name:"Drum kits", link:PAGE_ROUTES.products.drumKits},
            {name:"congos", link:PAGE_ROUTES.products.congos},
            {name:"Xylophones", link:PAGE_ROUTES.products.clarinets},
            {name:"Tambourines", link:PAGE_ROUTES.products.clarinets},
        ]
    }
]
     
       
    