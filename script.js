// 🔑 OPENAI requests via Netlify Functions (secure backend)

// ⚡ Generate Prompt Output from GPT
async function generateResponse() {
  const prompt = document.getElementById("prompt").value;
  const model = document.getElementById("model").value;
  const temperature = parseFloat(document.getElementById("temperature").value);

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ prompt, model, temperature }),
  });

  const data = await res.json();
  document.getElementById("generatedOutput").value = data.response;
}

// 🛠 Optimize Prompt using GPT-4
async function optimizePrompt() {
  const prompt = document.getElementById("prompt").value;

  const res = await fetch("/.netlify/functions/optimize", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  document.getElementById("optimizedPrompt").value = data.response;
}


// 💾 Save Prompt + Output
function savePrompt() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("output").value;

  if (!prompt.trim() || !output.trim()) {
    alert("Nothing to save. Please generate first.");
    return;
  }

  const saved = JSON.parse(localStorage.getItem("savedPrompts") || "[]");
  saved.push({ prompt, output, timestamp: new Date().toISOString() });
  localStorage.setItem("savedPrompts", JSON.stringify(saved));

  alert("✅ Prompt and output saved!");
}

// 🗑 Clear all fields
function clearFields() {
  document.getElementById("prompt").value = "";
  document.getElementById("output").value = "";
  document.getElementById("optimizedPromptOutput").value = "";
  document.getElementById("generated-output-box").style.display = "none";
  document.getElementById("optimized-output-box").style.display = "none";
  
}
 // 🪄 Auto-fill prompt if ?prefill= is in the URL
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const prefill = urlParams.get("prefill");
  if (prefill) {
    document.getElementById("prompt").value = decodeURIComponent(prefill);
    document.getElementById("generated-output-box").style.display = "none";
    document.getElementById("optimized-output-box").style.display = "none";
  }
};


