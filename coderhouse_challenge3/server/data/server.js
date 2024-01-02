import express from "express";
import newProduct from "./fs/productManager_fs.js";

const server = express();

const PORT = 8080;
const ready = console.log(`Server ready. Listening on port ${PORT}`);

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

// Endpoints
server.get("/api/products", (req, res) => {
  try {
    const all = newProduct.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
				success: true,
				message: all,
			});
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req, res) => {
	try {
		const { pid } = req.params;
		const one = newProduct.readOne(pid);
		return res.status(200).json(one);
	} catch (error) {
		return res.status(500).json({
      success: false,
      message: error.message,
    });
	}
});
