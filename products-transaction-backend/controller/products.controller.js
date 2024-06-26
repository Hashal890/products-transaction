const { default: axios } = require("axios");
const ProductModel = require("../models/products.model");

const initializeProducts = (req, res) => {
  try {
    axios
      .get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
      .then((response) => {
        ProductModel.insertMany(response.data);
        res.status(200).json({
          message: "Data inserted successfully!",
        });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    let { search = "", page = 1, perPage = 10 } = req.query;
    page = Number(page);
    perPage = Number(perPage);
    const searchQuery = {
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        Number(search) ? { price: Number(search) } : {},
      ],
    };
    const options = {
      page: page,
      limit: perPage,
      customLabels: {
        docs: "productsTransactions",
        totalDocs: "total",
        totalPages: "totalPages",
      },
    };
    const result = await ProductModel.paginate(searchQuery, options);
    res.status(200).json({
      message: "Request successfull!",
      productsTransactions: result.productsTransactions,
      total: result.total,
      page: result.page,
      perPage: result.limit,
      totalPages: result.totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStatistics = async (month) => {
  try {
    const productsTransactions = await ProductModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month],
      },
    });
    const totalAmountOfSale = productsTransactions.reduce((acc, curr) => {
      return curr.sold ? acc + curr.price : acc;
    }, 0);
    const totalSoldItems = productsTransactions.filter(
      (curr) => curr.sold
    ).length;
    const totalNotSoldItems = productsTransactions.length - totalSoldItems;
    return {
      totalAmountOfSale,
      totalSoldItems,
      totalNotSoldItems,
    };
  } catch (err) {
    return { error: err.message };
  }
};

const getBarChartData = async (month) => {
  try {
    const productsTransactions = await ProductModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month],
      },
    });
    const priceRangesOfMonth = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };
    for (let i = 0; i < productsTransactions.length; i++) {
      let price = productsTransactions[i].price;
      if (price >= 0 && price <= 100) priceRangesOfMonth["0-100"]++;
      else if (price >= 101 && price <= 200) priceRangesOfMonth["101-200"]++;
      else if (price >= 201 && price <= 300) priceRangesOfMonth["201-300"]++;
      else if (price >= 301 && price <= 400) priceRangesOfMonth["301-400"]++;
      else if (price >= 401 && price <= 500) priceRangesOfMonth["401-500"]++;
      else if (price >= 501 && price <= 600) priceRangesOfMonth["501-600"]++;
      else if (price >= 601 && price <= 700) priceRangesOfMonth["601-700"]++;
      else if (price >= 701 && price <= 800) priceRangesOfMonth["701-800"]++;
      else if (price >= 801 && price <= 900) priceRangesOfMonth["801-900"]++;
      else priceRangesOfMonth["901-above"]++;
    }
    const barCharData = [
      { priceRange: "100", numberOfItems: priceRangesOfMonth["0-100"] },
      { priceRange: "200", numberOfItems: priceRangesOfMonth["101-200"] },
      { priceRange: "300", numberOfItems: priceRangesOfMonth["201-300"] },
      { priceRange: "400", numberOfItems: priceRangesOfMonth["301-400"] },
      { priceRange: "500", numberOfItems: priceRangesOfMonth["401-500"] },
      { priceRange: "600", numberOfItems: priceRangesOfMonth["501-600"] },
      { priceRange: "700", numberOfItems: priceRangesOfMonth["601-700"] },
      { priceRange: "800", numberOfItems: priceRangesOfMonth["701-800"] },
      { priceRange: "900", numberOfItems: priceRangesOfMonth["801-900"] },
      {
        priceRange: "above 900",
        numberOfItems: priceRangesOfMonth["901-above"],
      },
    ];
    return barCharData;
  } catch (err) {
    return { error: err.message };
  }
};

const getPieChartData = async (month) => {
  try {
    const productsTransactions = await ProductModel.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month],
      },
    });
    const categories = {};
    for (let i = 0; i < productsTransactions.length; i++) {
      let { category } = productsTransactions[i];
      if (!categories[category]) categories[category] = 1;
      else categories[category]++;
    }
    const pieChartData = [];
    for (let key in categories) {
      pieChartData.push({ x: key, y: categories[key] });
    }
    return pieChartData;
  } catch (err) {
    return { error: err.message };
  }
};

const getAllThreeApiResponses = async (req, res) => {
  try {
    let { month } = req.query;
    month = Number(month);
    if (isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({
        message: "Add correct month in query. Month should be between 1 to 12",
      });
    }
    const [statistics, barChartData, pieChartData] = await Promise.all([
      getStatistics(month),
      getBarChartData(month),
      getPieChartData(month),
    ]);
    res.status(200).json({
      message: "Request successfull!",
      statistics,
      barChartData,
      pieChartData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  initializeProducts,
  getTransactions,
  getAllThreeApiResponses,
};
