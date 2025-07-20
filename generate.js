const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const { prompt, model, temperature } = JSON.parse(event.body);
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: parseFloat(temperature)
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid response from OpenAI.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ response: data.choices[0].message.content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
