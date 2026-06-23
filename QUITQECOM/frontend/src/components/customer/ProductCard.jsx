import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

    return (

        <div
            className="card border-0 shadow-sm h-100"
            style={{
                borderRadius: "18px",
                transition: "0.3s"
            }}
        >

            <img
                src={`/images/${product.imagePath}`}
                alt={product.productName}
                className="card-img-top"
                style={{
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "18px",
                    borderTopRightRadius: "18px"
                }}
            />

            <div className="card-body">

                <h5 className="fw-bold">
                    {product.productName}
                </h5>

                <p
                    className="text-muted"
                    style={{
                        fontSize: "14px"
                    }}
                >
                    {product.description}
                </p>

               {
    product.offerPercentage > 0 ? (

        <>

            <div className="mb-1">

                <span
                    className="text-decoration-line-through text-muted me-2"
                >
                    ₹{product.price}
                </span>

                <span className="badge bg-danger">
                    {product.offerPercentage}% OFF
                </span>

            </div>

            <h5 className="fw-bold text-success">

                ₹{
                    product.price -
                    (
                        product.price *
                        product.offerPercentage
                    ) / 100
                }

            </h5>

        </>

    ) : (

        <h5 className="fw-bold text-success">
            ₹{product.price}
        </h5>

    )
}

                <span className="badge bg-secondary">
                    {product.category?.categoryName}
                </span>

            </div>

            <div className="card-footer bg-white border-0">

                <Link
                    to={`/customer/product/${product.id}`}
                    className="btn btn-dark w-100"
                >
                    View Product
                </Link>

            </div>

        </div>

    );
};

export default ProductCard;