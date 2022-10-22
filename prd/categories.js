require('dotenv').config();
const {request, gql} = require('graphql-request')

const endpoint = process.env.GRAPHQL_ENDPOINT
const getErrorStr = (e) => {
    return {
        isError: true,
        code: e.code || 500,
        message: e.message,
        type: e.type,
        origin: e.name || e.origin
    }
}

exports.listAll = async function (req, res) {
    const query = gql`
    {
        categoryList(filters: null) {
            children {
                uid
                name
                url_path
            }
        }
    }
    `
    try {
        const data = await request(endpoint, query)
        res.json(data)
    } catch (e) {
        res.status(500).json(getErrorStr(e));
    }
};

exports.listProducts = async function (req, res) {
    const query = gql`
    {
        products(
        filter: {
            category_uid: {
                eq: "${req.params.category}"
            }
        },
        pageSize: 6,
        currentPage: ${req.params.page}
        ) {
            items {
                id
                image {
                    url
                }
                name
                price_range {
                    minimum_price {
                        final_price {
                            value
                        }
                    }
                    maximum_price {
                        final_price {
                            value
                        }
                    }
                }
            }
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }`

    try {
        const data = await request(endpoint, query)
        res.json(data)
    } catch (e) {
        res.status(500).json(getErrorStr(e));
    }
}