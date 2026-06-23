const ProductFilters = ({
    offersOnly,
setOffersOnly,
    keyword,
    setKeyword,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categories,
    selectedCategory,
    setSelectedCategory,
    applyFilters
}) => {

    return (

        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: "18px"
            }}
        >

            <div className="card-body">

                <h5 className="fw-bold mb-4">
                    Filters
                </h5>

                <div className="mb-3">

                    <label className="form-label">
                        Search
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Product"
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Category
                    </label>

                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Categories
                        </option>

                        {
                            categories.map(
                                (category) => (

                                    <option
                                        key={category.id}
                                        value={
                                            category.categoryName
                                        }
                                    >
                                        {
                                            category.categoryName
                                        }
                                    </option>

                                )
                            )
                        }

                    </select>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Min Price
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(e.target.value)
                        }
                    />

                </div>

                <div className="mb-4">

                    <label className="form-label">
                        Max Price
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(e.target.value)
                        }
                    />

                </div>

                <div className="form-check mb-4">

    <input
        type="checkbox"
        className="form-check-input"
        checked={offersOnly}
        onChange={() =>
            setOffersOnly(
                !offersOnly
            )
        }
    />

    <label className="form-check-label">

        Offers Only

    </label>

</div>

                <button
                    className="btn btn-dark w-100"
                    onClick={applyFilters}
                >
                    Apply Filters
                </button>

            </div>

        </div>

    );
};

export default ProductFilters;