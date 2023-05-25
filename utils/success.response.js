class successResponse{
    constructor(data, code = 200){
        this.result = data;
        this.statusCode = code;
    }
}

class successArrayResponse{
    constructor(data, count, req, code = 200){
        this.result = data;
        this.count = count;
        this.statusCode = code;
        const {offset, limit} = req.pagination;
        const next = offset + limit;
        const previous = offset - limit;
        this.next = next < count ? `${req.baseUrl}?offset=${next}&limit=${limit}` : null;
        this.previous = offset === 0 ? null : `${req.baseUrl}?offset=${previous < 0 ? 0 : previous}&limit=${limit}`
    }
}


module.exports = {successResponse, successArrayResponse}