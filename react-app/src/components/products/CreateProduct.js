import React from "react";
import FileInput from "../toolbox/FileInput";
import SelectInput from "../toolbox/SelectInput";
import TextInput from "../toolbox/TestInput";

const CreateProduct = ({ categories, product, onSave, onChange, errors }) => {
    return (
        <form onSubmit={onSave}>
            <h2>{product.id ? "Update" : "Create"}</h2>

            <TextInput id="title" name="title" label="Product Name" value={product.title} onChange={onChange} error={errors.title} />
            <TextInput id="description" name="description" label="Description" value={product.description} onChange={onChange} error={errors.description} />
            <TextInput id="price" name="price" label="Price" value={product.price} onChange={onChange} error={errors.price} />
            <TextInput id="discountPercentage" name="discountPercentage" label="Discount Percentage" value={product.discountPercentage} onChange={onChange} error={errors.discountPercentage} />
            <TextInput id="rating" name="rating" label="Rating" value={product.rating} onChange={onChange} error={errors.rating} />
            <TextInput id="stock" name="stock" label="Stock" value={product.stock} onChange={onChange} error={errors.stock} />
            <TextInput id="brand" name="brand" label="Brand" value={product.brand} onChange={onChange} error={errors.brand} />
            <FileInput id="thumbnail" name="thumbnail" label="Thumbnail" alt="Thumbnail" isMultiple={false} value={product.thumbnail} onChange={onChange} error={errors.thumbnail} />
            <FileInput id="images" name="images" label="Images" isMultiple={true} value={product.images} onChange={onChange} error={errors.images} />

            <SelectInput
                id="selectCategoryId"
                name="selectCategoryId"
                label="Category"
                value={product.category || ""}
                defaultOption="Choice"
                options={categories.map(category => ({
                    value: category.categoryId,
                    text: category.categoryName

                }))}
                onChange={onChange}
                error={errors.category}
            />

            <button type="submit" className="btn btn-success">Save</button>
        </form>
    );

};

export default CreateProduct;