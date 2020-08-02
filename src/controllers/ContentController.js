const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const contents = await connection('content').select('*');

    return response.json(contents);
  },
  async create(request, response) {
    const { title, slides } = request.body;

    const idContent = await connection('content').insert({
      title
    });

    var order = 0;

    slides.forEach(async function(slide) {
      order++;
      await connection('slide_content').insert({
        content_id: idContent,
        description: slide,
        order_number: order,
      });
    });

    return response.json({id: idContent});
  }
}