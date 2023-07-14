export interface ISubCategory{
    _id?: string;
    name?: string;
    description?: string;
}

export interface ICategory {
    _id?: string;
    name?: string;
    description?: string;
    subcategories?: ISubCategory[];
}