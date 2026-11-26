const Category = require('./categoryModel');

async function createCategory(name) {
    // Busca no banco de dados se já existe alguma categoria com este mesmo nome
    const existingCategory = await Category.findOne({ where: { name } });

    // Regra de Negócio: Não permite criar duplicado
    if (existingCategory) {
        throw new Error("Esta categoria já existe!");
    }

    // Se passou pela checagem acima, salva a nova categoria no banco
    const newCategory = await Category.create({ name });
    
    return newCategory;
}

module.exports = {
    createCategory
};
