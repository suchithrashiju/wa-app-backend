/**
 * Message Helper
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description:
 *
 * 
 //The Date and Changes made sections are duplicated in each updated comment entry
 * Last Updated: 
 * 
 * Changes:
 * 
 * Date: 
 * Functions: 
 * // Changed Function Names
 * - 
 * 
 * Changes Made:
 * // Changes
 * - 
 */

// Import necessary dependencies

var axios = require("axios");

async function getAccessToken() {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/oauth/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&grant_type=client_credentials`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error("Failed to obtain access token.");
    }
  } catch (error) {
    console.error("Error obtaining access token:", error.message);
    throw error;
  }
}

function sendMessage(data) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

function getTextMessageInput(recipient, messagetext) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: messagetext,
  });
}

function getTemplatedMessageInputWithoutBodyParam(recipient, templatedata) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: templatedata.type,
    template: {
      name: templatedata.template.name,
      language: {
        code: templatedata.template.language.code,
      },
      components: [
        {
          type: "body",
          parameters: [],
        },
      ],
    },
  });
}

function getTemplatedMessageInput(recipient, movie, seats) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "test_movie_ticket_confirmation",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: movie.thumbnail,
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: movie.title,
            },
            {
              type: "date_time",
              date_time: {
                fallback_value: movie.time,
              },
            },
            {
              type: "text",
              text: movie.venue,
            },
            {
              type: "text",
              text: seats,
            },
          ],
        },
      ],
    },
  });
}

async function getMessageTemplates(params = {}) {
  const defaultParams = {
    access_token: process.env.ACCESS_TOKEN,
    // fields: "name,status",
    // limit: 3,
  };

  const mergedParams = { ...defaultParams, ...params };

  //https://graph.facebook.com/v17.0/104961836023719/message_templates?access_token=

  try {
    const response = await axios.get(
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.WA_BUSINESS_ACCOUNT_ID}/message_templates`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: mergedParams,
      }
    );

    // Return the data containing the message templates
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching message templates:", error.message);
    throw error;
  }
}

async function createMessageTemplate(template) {
  console.log("name:" + process.env.TEMPLATE_NAME_PREFIX + "_" + template.name);

  const config = {
    method: "post",
    url: `https://graph.facebook.com/${apiVersion}/${myBizAcctId}/message_templates`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: {
      name: process.env.TEMPLATE_NAME_PREFIX + "_" + template.name,
      category: template.category,
      components: template.components,
      language: template.language,
    },
  };

  return await axios(config);
}

function getMessageData(recipient, order) {
  const messageTemplate = messageTemplates[order.statusId - 1];

  let messageParameters;

  switch (messageTemplate.name) {
    case "welcome":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] },
      ];
      break;
    case "payment_analysis":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] },
        { type: "text", text: products[order.items[0].productId - 1].name },
      ];
      break;
    case "payment_approved":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deliveryDate },
      ];
      break;
    case "invoice_available":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] },
        { type: "text", text: products[order.items[0].productId - 1].name },
        {
          type: "text",
          text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}`,
        },
      ];
      break;
    case "order_picked_packed":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] },
        { type: "text", text: order.id },
        {
          type: "text",
          text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}`,
        },
      ];
      break;
    case "order_in_transit":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deliveryDate },
        {
          type: "text",
          text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}`,
        },
      ];
      break;
    case "order_delivered":
      messageParameters = [
        { type: "text", text: order.customer.split(" ")[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deadlineDays },
      ];
      break;
  }

  const messageData = {
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: process.env.TEMPLATE_NAME_PREFIX + "_" + messageTemplate.name,
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: messageParameters,
        },
      ],
    },
  };

  return JSON.stringify(messageData);
}

async function updateWhatsAppMessage(data) {
  const config = {
    method: "put",
    url: `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
}

function getMessageInputData(recipient, msgParam) {
  if (msgParam.type === "image") {
    if (msgParam.image.caption && msgParam.image.caption != null) {
      return JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: msgParam.type,
        image: {
          link: msgParam.image.link,
          caption: msgParam.image.caption,
        },
      });
    } else {
      return JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: msgParam.type,
        image: {
          link: msgParam.image.link,
        },
      });
    }
  } else if (msgParam.type === "contacts") {
    return JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: msgParam.type,
      contacts: msgParam.contacts,
    });
  } else if (msgParam.type === "document") {
    return JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: msgParam.type,
      document: {
        link: msgParam.document.link,
        filename: msgParam.document.filename,
      },
    });
  } else if (msgParam.type === "video") {
    return JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: msgParam.type,
      video: {
        link: msgParam.video.link,
        caption: msgParam.video.caption,
      },
    });
  } else if (msgParam.type === "audio") {
    return JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: msgParam.type,
      audio: {
        link: msgParam.audio.link,
        caption: msgParam.audio.caption,
      },
    });
  }
}

/*function getMessageInputData(inp_type, recipient, templatedata) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: templatedata.type,
    template: {
      name: templatedata.template.name,
      language: {
        code: templatedata.template.language.code,
      },
      components: [
        {
          type: "body",
          parameters: [],
        },
      ],
    },
  });
}*/
module.exports = {
  sendMessage: sendMessage,
  getTextMessageInput: getTextMessageInput,
  getTemplatedMessageInput: getTemplatedMessageInput,
  getMessageTemplates: getMessageTemplates,
  getAccessToken: getAccessToken,
  getTemplatedMessageInputWithoutBodyParam:
    getTemplatedMessageInputWithoutBodyParam,
  getMessageInputData,
};
