const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const useragent = require("express-useragent");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const process = require("process");
const cors = require("cors");
global.appRoot = path.resolve(__dirname);
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/apis");
const users = require("./routes/users");
const index = require("./routes/index");

const app = express();
app.use(cors());
app.use(useragent.express());
// parse application/json
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
// file upload file
app.use(
	fileUpload({
		limits: { fileSize: 5000 * 1024 * 1024 },
		createParentPath: true,
		tempFileDir: "/tmp/",
	})
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/admin/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.use(function (req, res, next) {
	global.appURL = req.protocol + "://" + req.get("host") + "/";
	next();
});

app.use("/admins", adminRouter);
app.use("/apis/v1/", apiRouter);
app.use("/users", users);
app.use("/welcome", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

process
	.on("unhandledRejection", (reason, p) => {
		console.error(reason, "Unhandled Rejection at Promise", p);
	})
	.on("uncaughtException", (err) => {
		console.error(err, "Uncaught Exception thrown");
		// process.exit(1);
	});

module.exports = app;
