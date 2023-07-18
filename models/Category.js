import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// const Category = models?.Category || model('Category', CategorySchema)
export default Category