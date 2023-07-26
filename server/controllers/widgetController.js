const widgetService = require("../services/widgetService");

exports.generateWidget = async (req, res, next) => {
  const productId = req.mainParams.pid;
  const type = req.body.type;
  const hideDate = req.body.hideDate;
  const scrollSpeed = req.body.scrollSpeed;
  const autoScroll = req.body.autoScroll;

  try {
    const widget = await widgetService.generateWidgetConfig(
      productId,
      scrollSpeed,
      hideDate,
      type,
      autoScroll
    );
    res
      .status(200)
      .json({ message: "Widget configuration saved successfully.", widget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving widget configuration.", error });
  }
};

exports.getWidget = async (req, res, next) => {
  const userId = req.mainParams.id;
  const productId = req.mainParams.pid;

  try {
    const widget = await widgetService.getWidgetConfig(userId, productId);

    if (!widget) {
      return res.status(404).json({
        message:
          "No widget configuration found for the specified user and product.",
      });
    }

    res.status(200).json({ widget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching widget configuration.", error });
  }
};

exports.serveWidget = async (req, res, next) => {
  const widgetId = req.params.wid;
  const productId = req.mainParams.pid;

  try {
    const widgetConfig = await widgetService.getWidgetConfig(
      widgetId,
      productId
    );

    if (!widgetConfig) {
      return res.status(404).json({
        message:
          "No widget configuration found for the specified user and product.",
      });
    }

    const widgetRepresentation =
      await widgetService.generateWidgetRepresentation(
        productId,
        widgetConfig.scrollSpeed,
        widgetConfig.hideDate,
        widgetConfig.type,
        widgetConfig.autoScroll
      );

    res.status(200).send(widgetRepresentation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error serving the widget." });
  }
};
