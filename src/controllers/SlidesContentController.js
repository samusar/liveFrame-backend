const connection = require('../database/connection');

module.exports = {
  async listByContent(request, response) {
    const {id} = request.params;

    const slides = await connection('slide_content').where('content_id', '=', id).select('*').orderBy('order_number', 'asc');

    return response.json(slides);
  }
}