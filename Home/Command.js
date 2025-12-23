function handleCommand(text){
  const cmd = text.toLowerCase().trim();

  // CLEAR CHAT
  if(cmd === "clear chat"){
    clearChat();
    systemMessage("Chat cleared successfully.");
    return true;
  }

  // NEW CHAT
  if(cmd === "new chat"){
    newChat();
    systemMessage("New chat created.");
    return true;
  }

  // DELETE MESSAGE BY ID
  if(cmd.startsWith("delete message id")){
    const id = cmd.split("=").pop()?.trim();
    if(id){
      deleteMessage(id);
      systemMessage(`Message ${id} deleted.`);
    }
    return true;
  }

  // DELETE CURRENT CHAT
  if(cmd === "delete chat"){
    deleteActiveChat();
    systemMessage("Chat deleted.");
    return true;
  }

    // RENAME CHAT
  if(cmd.startsWith("rename chat")){
    const title = text.split("=").pop()?.trim();
    if(title){
      chats[activeChatId].title = title;
      saveState();
      renderChatList();
      systemMessage(`Chat renamed to "${title}".`);
    }
    return true;
  }

  // LIST CHATS
  if(cmd === "list chats"){
    const names = Object.values(chats)
      .map(c => `• ${c.title}`)
      .join("<br>");
    systemMessage(`<b>Your Chats</b><br>${names}`);
    return true;
  }

  // PIN CHAT
  if(cmd === "pin chat"){
    chats[activeChatId].pinned = true;
    saveState();
    systemMessage("Chat pinned.");
    return true;
  }

  // UNPIN CHAT
  if(cmd === "unpin chat"){
    chats[activeChatId].pinned = false;
    saveState();
    systemMessage("Chat unpinned.");
    return true;
  }

  // ARCHIVE CHAT
  if(cmd === "archive chat"){
    chats[activeChatId].archived = true;
    saveState();
    systemMessage("Chat archived.");
    return true;
  }

  // RESTORE CHAT
  if(cmd === "restore chat"){
    chats[activeChatId].archived = false;
    saveState();
    systemMessage("Chat restored.");
    return true;
  }

  // SHOW LAST MESSAGE
  if(cmd === "last message" || cmd === "maini last message kya likha tha" || cmd === "Tell me about where we end"){
    const msgs = chats[activeChatId].messages;
    const last = msgs[msgs.length - 1];
    if(last){
      systemMessage(`<b>Last Message:</b><br>${last.content}`);
    }
    return true;
  }

  // DELETE LAST MESSAGE
  if(cmd === "delete last message" || cmd === "Aakhiri message delete karo" || cmd === "Message delete kar" || cmd === "message delete kar yar" || cmd === "delete please"){
    chats[activeChatId].messages.pop();
    saveState();
    renderMessages();
    systemMessage("Last message deleted.");
    return true;
  }

  // COUNT MESSAGES
  if(cmd === "count messages" || cmd === "number of messages" || cmd === "total messages" || cmd === "how many messages" || cmd === "message count" || cmd === "count of messages" || cmd === "total number of messages" || cmd === "how many messages are there" || cmd === "how many messages in this chat" || cmd === "number of messages in this chat" || cmd === "total messages in this chat" || cmd === "message count in this chat" || cmd === "count messages in this chat" || cmd === "count of messages in this chat" || cmd === "total number of messages in this chat" || cmd === "how many messages are there in this chat" || cmd === "ai , count messages" || cmd === "hey quizzoneai , count messages" || cmd === "ai , how many messages" || cmd === "hey quizzoneai , how many messages" || cmd === "ai , total messages" || cmd === "hey quizzoneai , total messages"){
    const count = chats[activeChatId].messages.length;
    systemMessage(`Total messages in this chat: <b>${count}</b>`);
    return true;
  }

  // SEARCH MESSAGE
  if(cmd.startsWith("search message") || cmd.startsWith("find message") || cmd.startsWith("search messages") || cmd.startsWith("find messages")){
    const key = text.split("=").pop()?.trim();
    if(key){
      const found = chats[activeChatId].messages
        .filter(m => m.content.toLowerCase().includes(key.toLowerCase()))
        .map(m => `• ${m.content.substring(0,60)}...`)
        .join("<br>");
      systemMessage(found || "No matching messages found.");
    }
    return true;
  }

  // TOGGLE THEME
  if(cmd === "toggle theme" || cmd === "switch theme" || cmd === "change theme" || cmd === "AI , toggle theme" || cmd === "Hey QuizzoneAI , toggle theme" || cmd === "AI , change theme" || cmd === "Hey QuizzoneAI , change theme" || cmd === "AI , switch theme" || cmd === "Hey QuizzoneAI , switch theme"){
    toggleTheme();
    systemMessage("Theme toggled.");
    return true;
  }

  // DARK MODE
  if(cmd === "dark mode" || cmd === "enable dark mode" || cmd === "night mode" || cmd === "AI , enable dark mode" || cmd === "Hey QuizzoneAI , enable dark mode" || cmd === "AI , mujhe light mai dikh nhi rha hai, light mode off kr do" || cmd === "Hey QuizzoneAI , mujhe dikh rha hai, light mode off kr do" || cmd === "AI , mujhe dikh nhi rha hai, light mode off kr do" || cmd === "Hey QuizzoneAI , mujhe dikh nhi rha hai, light mode off kr do" || cmd === "AI , disable light mode" || cmd === "Hey QuizzoneAI , disable light mode"){
    document.body.dataset.theme = "dark";
    systemMessage("Dark mode enabled.");
    return true;
  }

  // LIGHT MODE
  if(cmd === "light mode" || cmd === "normal mode" || cmd === "default mode" || cmd === "day mode" || cmd === "enable light mode" || cmd === "AI , mujhe dikh nhi rha hai, light mode on kr do" || cmd === "Hey QuizzoneAI , mujhe dikh nhi rha hai, light mode on kr do" || cmd === "AI , mujhe dikh nahi rha hai, light mode on kr do" || cmd === "Hey QuizzoneAI , mujhe dikh nahi rha hai, light mode on kr do" || cmd === "AI , enable light mode" || cmd === "Hey QuizzoneAI , enable light mode"){
    document.body.dataset.theme = "light";
    systemMessage("Light mode enabled.");
    return true;
  }

  // CLEAR INPUT
  if(cmd === "clear input" || cmd === "clear text" || cmd === "clear textbox" || cmd === "clear chat input" || cmd === "clear message input" || cmd === "clear message box" || cmd === "clear text box" || cmd === "clear chat box" || cmd === "clear chat textbox" || cmd === "clear message textbox" || cmd === "clear input box"){
    document.getElementById("input").value = "";
    systemMessage("Input cleared.");
    return true;
  }

  // SCROLL TO BOTTOM
  if(cmd === "scroll bottom" || cmd === "scroll to bottom" || cmd === "scroll down" || cmd === "go to bottom" || cmd === "move to bottom" || cmd === "jump to bottom"){
    document.getElementById("chatArea").scrollTop =
      document.getElementById("chatArea").scrollHeight;
    systemMessage("Scrolled to bottom.");
    return true;
  }

  // HELP
  if(cmd === "help" || cmd === "help commands" || cmd === "commands help" || cmd === "list commands" || cmd === "show commands" || cmd === "available commands" ||
     cmd === "command list" || cmd === "command help" || cmd === "help me" || cmd === "i need help" ||
     cmd === "what can you do" || cmd === "how to use commands" || cmd === "command guide" || cmd === "command instructions" || cmd === "command manual"){
    systemMessage(`
      <b>Available Commands</b><br>
      clear chat<br>
      new chat<br>
      delete message id = ...<br>
      rename chat = title<br>
      list chats<br>
      pin chat / unpin chat<br>
      archive chat / restore chat<br>
      last message<br>
      delete last message<br>
      count messages<br>
      search message = keyword<br>
      toggle theme / dark mode / light mode<br>
      clear input<br>
      scroll bottom
    `);
    return true;
  }

    /* ================= HTML MANIPULATION ================= */

  // ADD BANNER TO CHAT AREA
  if(cmd === "add banner" || cmd === "insert banner" ||
     cmd === "create banner" || cmd === "show banner" ||
     cmd === "AI , Add banner" || cmd === "AI , Insert banner " ||
     cmd === "AI , Create banner" || cmd === "AI , Show banner" ||
     cmd === "Hey QuizzoneAI , add banner" || cmd === "Hey QuizzoneAI, add banner" ||
     cmd === "Hey QuizzoneAI , insert banner" || cmd === "Hey QuizzoneAI, insert banner" ||
     cmd === "Hey QuizzoneAI , create banner" || cmd === "Hey QuizzoneAI, create banner" || cmd === "Hey QuizzoneAI , show banner" || cmd === "Hey QuizzoneAI, show banner" || cmd === "add banner to chat area" || cmd === "insert banner to chat area" ||cmd === "create banner to chat area" || cmd === "show banner to chat area"){
    document.getElementById("chatArea")
      .insertAdjacentHTML("afterbegin",
      `<div class="qa-banner">⚡ QuizzoneAI Live Workspace</div>`);
    systemMessage("Banner added to chat area.");
    return true;
  }

  // CLEAR CHAT AREA HTML (NOT DATA)
  if(cmd === "clear chat html" || cmd === "clear chat area html" || 
     cmd === "clear chat window html" || cmd === "clear chatbox html" ||
     cmd === "clear chat area" || cmd === "clear chat window" || cmd === "clear chatbox" || cmd === "clear chat" || cmd === "clear chat area html" || cmd === "clear chat window html" || cmd === "clear chatbox html"){
    document.getElementById("chatArea").innerHTML = "";
    systemMessage("Chat area HTML cleared (data preserved).");
    return true;
  }

  // ADD FOOTER NOTE
  if(cmd.startsWith("add footer note") || cmd.startsWith("insert footer note") ||
     cmd.startsWith("create footer note") || cmd.startsWith("show footer note") ||
     cmd.startsWith("AI , Add footer note") || cmd.startsWith("AI , Insert footer note ") ||
     cmd.startsWith("AI , Create footer note") || cmd.startsWith("AI , Show footer note") ||
     cmd.startsWith("Hey QuizzoneAI , add footer note") || cmd.startsWith("Hey QuizzoneAI, add footer note") || cmd.startsWith("Hey QuizzoneAI , insert footer note") || cmd.startsWith("Hey QuizzoneAI, insert footer note") || cmd.startsWith("Hey QuizzoneAI , create footer note") || cmd.startsWith("Hey QuizzoneAI, create footer note") || cmd.startsWith("Hey QuizzoneAI , show footer note") || cmd.startsWith("Hey QuizzoneAI, show footer note") || cmd.startsWith("add footer") || cmd.startsWith("insert footer") || cmd.startsWith("create footer") || cmd.startsWith("show footer")){
    const note = text.split("=").pop()?.trim();
    if(note){
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div class="qa-footer-note">${note}</div>`
      );
      systemMessage("Footer note added.");
    }
    return true;
  }

  // REPLACE HEADER TITLE
  if(cmd.startsWith("replace header title") || cmd.startsWith("set header title") ||
     cmd.startsWith("change header title") || cmd.startsWith("update header title") || cmd.startsWith("AI , Replace header title") || cmd.startsWith("AI , Set header title") || cmd.startsWith("AI , Change header title") || cmd.startsWith("AI , Update header title") || cmd.startsWith("Hey QuizzoneAI , replace header title") || cmd.startsWith("Hey QuizzoneAI, replace header title") || cmd.startsWith("Hey QuizzoneAI , set header title") || cmd.startsWith("Hey QuizzoneAI, set header title") || cmd.startsWith("Hey QuizzoneAI , change header title") || cmd.startsWith("Hey QuizzoneAI, change header title") || cmd.startsWith("Hey QuizzoneAI , update header title") || cmd.startsWith("Hey QuizzoneAI, update header title")){
    const title = text.split("=").pop()?.trim();
    if(title){
      document.querySelector(".topbar strong").innerHTML = title;
      systemMessage("Header title updated.");
    }
    return true;
  }

  // ADD INFO CARD
  if(cmd === "add info card" || cmd === "insert info card" ||
     cmd === "create info card" || cmd === "show info card" ||
     cmd === "AI , Add info card" || cmd === "AI , Insert info card " ||
     cmd === "AI , Create info card" || cmd === "AI , Show info card" ||
     cmd === "Hey QuizzoneAI , add info card" || cmd === "Hey QuizzoneAI, add info card" ||
     cmd === "Hey QuizzoneAI , insert info card" || cmd === "Hey QuizzoneAI, insert info card" ||
     cmd === "Hey QuizzoneAI , create info card" || cmd === "Hey QuizzoneAI, create information card" || cmd === "Hey QuizzoneAI , show info card" || cmd === "Hey QuizzoneAI, show info card"){
    document.getElementById("chatArea")
      .insertAdjacentHTML("beforeend",
      `<div class="qa-info-card">
        <h4>Info</h4>
        <p>This UI element was injected via command.</p>
      </div>`);
    systemMessage("Info card injected.");
    return true;
  }

  /* ================= CSS INJECTION ================= */

  // INJECT CSS INLINE
  if(cmd.startsWith("inject css") || cmd.startsWith("add css") || cmd.startsWith("insert css") || cmd.startsWith("apply css") || cmd.startsWith("AI , Inject css") || cmd.startsWith("AI , Add css") || cmd.startsWith("AI , Insert css") || cmd.startsWith("AI , Apply css") || cmd.startsWith("Hey QuizzoneAI , inject css") || cmd.startsWith("Hey QuizzoneAI, inject css") || cmd.startsWith("Hey QuizzoneAI , add css") || cmd.startsWith("Hey QuizzoneAI, add css") || cmd.startsWith("Hey QuizzoneAI , insert css") || cmd.startsWith("Hey QuizzoneAI, insert css") || cmd.startsWith("Hey QuizzoneAI , apply css") || cmd.startsWith("Hey QuizzoneAI, apply css") || cmd.startsWith("inject stylesheet") || cmd.startsWith("add stylesheet") || cmd.startsWith("insert stylesheet") || cmd.startsWith("apply stylesheet") || cmd.startsWith("AI , Inject stylesheet") || cmd.startsWith("AI , Add stylesheet") || cmd.startsWith("AI , Insert stylesheet") || cmd.startsWith("AI , Apply stylesheet") || cmd.startsWith("Hey QuizzoneAI , inject stylesheet") || cmd.startsWith("Hey QuizzoneAI, inject stylesheet") || cmd.startsWith("Hey QuizzoneAI , add stylesheet") || cmd.startsWith("Hey QuizzoneAI, add stylesheet") || cmd.startsWith("Hey QuizzoneAI , insert stylesheet") || cmd.startsWith("Hey QuizzoneAI, insert stylesheet") || cmd.startsWith("Hey QuizzoneAI , apply stylesheet") || cmd.startsWith("Hey QuizzoneAI, apply stylesheet")){
    const css = text.split("=").pop()?.trim();
    if(css){
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);
      systemMessage("Custom CSS injected.");
    }
    return true;
  }

  // ADD DEFAULT UI CSS PACK
  if(cmd === "apply soft ui" || cmd === "apply soft ui style" || cmd === "apply soft ui styles" || cmd === "apply soft ui style pack" || cmd === "AI , Apply soft ui" || cmd === "AI , Apply soft ui style" || cmd === "AI , Apply soft ui styles" || cmd === "AI , Apply soft ui style pack" || cmd === "Hey QuizzoneAI , apply soft ui" || cmd === "Hey QuizzoneAI, apply soft ui" || cmd === "Hey QuizzoneAI , apply soft ui style" || cmd === "Hey QuizzoneAI, apply soft ui style" || cmd === "Hey QuizzoneAI , apply soft ui styles" || cmd === "Hey QuizzoneAI, apply soft ui styles" || cmd === "Hey QuizzoneAI , apply soft ui style pack" || cmd === "Hey QuizzoneAI, apply soft ui style pack" || cmd === "apply soft-ui" || cmd === "apply soft-ui style" || cmd === "apply soft-ui styles" || cmd === "apply soft-ui style pack" || cmd === "AI , Apply soft-ui" || cmd === "AI , Apply soft-ui style" || cmd === "AI , Apply soft-ui styles" || cmd === "AI , Apply soft-ui style pack" || cmd === "Hey QuizzoneAI , apply soft-ui" || cmd === "Hey QuizzoneAI, apply soft-ui" || cmd === "Hey QuizzoneAI , apply soft-ui style" || cmd === "Hey QuizzoneAI, apply soft-ui style" || cmd === "Hey QuizzoneAI , apply soft-ui styles" || cmd === "Hey QuizzoneAI, apply soft-ui styles" || cmd === "Hey QuizzoneAI , apply soft-ui style pack" || cmd === "Hey QuizzoneAI, apply soft-ui style pack"){
    const style = document.createElement("style");
    style.innerHTML = `
      .qa-banner{
        padding:10px;
        background:linear-gradient(90deg,#2563eb,#38bdf8);
        color:white;
        border-radius:10px;
        margin-bottom:12px;
        text-align:center;
      }
      .qa-info-card{
        background:#f1f5ff;
        border-left:4px solid #2563eb;
        padding:12px;
        border-radius:10px;
        margin-top:12px;
      }
      .qa-footer-note{
        position:fixed;
        bottom:10px;
        right:10px;
        background:#020617;
        color:white;
        padding:8px 12px;
        border-radius:10px;
        font-size:12px;
      }
    `;
    document.head.appendChild(style);
    systemMessage("Soft UI style pack applied.");
    return true;
  }

  // RESET ALL INJECTED STYLES
  if(cmd === "reset styles" || cmd === "remove injected styles" || cmd === "clear injected styles" || cmd === "remove all injected styles" || cmd === "clear all injected styles" || cmd === "reset all styles" || cmd === "AI , Reset styles" || cmd === "AI , Remove injected styles" || cmd === "AI , Clear injected styles" || cmd === "AI , Remove all injected styles" || cmd === "AI , Clear all injected styles" || cmd === "AI , Reset all styles" || cmd === "Hey QuizzoneAI , reset styles" || cmd === "Hey QuizzoneAI, reset styles" || cmd === "Hey QuizzoneAI , remove injected styles" || cmd === "Hey QuizzoneAI, remove injected styles" || cmd === "Hey QuizzoneAI , clear injected styles" || cmd === "Hey QuizzoneAI, clear injected styles" || cmd === "Hey QuizzoneAI , remove all injected styles" || cmd === "Hey QuizzoneAI, remove all injected styles" || cmd === "Hey QuizzoneAI , clear all injected styles" || cmd === "Hey QuizzoneAI, clear all injected styles" || cmd === "Hey QuizzoneAI , reset all styles" || cmd === "Hey QuizzoneAI, reset all styles"){
    document.querySelectorAll("style").forEach(s=>{
      if(s.innerHTML.includes("qa-")) s.remove();
    });
    systemMessage("Injected styles removed.");
    return true;
  }

  /* ================= DOM TRANSFORM ================= */

  // HIGHLIGHT USER MESSAGES
  if(cmd === "highlight user messages" || cmd === "highlight User messages" || cmd === "highlight human messages" || cmd === "highlight human user messages" || cmd === "highlight human user bubbles" || cmd === "highlight human bubbles" || cmd === "highlight user bubbles" || cmd === "AI , Highlight user messages" || cmd === "AI , Highlight human messages" || cmd === "AI , Highlight human user messages" || cmd === "AI , Highlight human user bubbles" || cmd === "AI , Highlight user bubbles" || cmd === "Hey QuizzoneAI , highlight user messages" || cmd === "Hey QuizzoneAI, highlight user messages" || cmd === "Hey QuizzoneAI , highlight human messages" || cmd === "Hey QuizzoneAI, highlight human messages" || cmd === "Hey QuizzoneAI , highlight human user messages" || cmd === "Hey QuizzoneAI, highlight human user messages" || cmd === "Hey QuizzoneAI , highlight human user bubbles" || cmd === "Hey QuizzoneAI, highlight human user bubbles" || cmd === "Hey QuizzoneAI , highlight user bubbles" || cmd === "Hey QuizzoneAI, highlight user bubbles"){
    document.querySelectorAll(".message.user .bubble")
      .forEach(el=>{
        el.style.boxShadow="0 0 0 2px #38bdf8";
      });
    systemMessage("User messages highlighted.");
    return true;
  }

  // HIGHLIGHT AI MESSAGES
  if(cmd === "highlight ai messages" || cmd === "highlight AI messages" || cmd === "highlight QuizzoneAI messages" || cmd === "highlight quizzoneai messages" || cmd === "highlight assistant messages" || cmd === "highlight bot messages" || cmd === "AI , Highlight AI messages" || cmd === "AI , Highlight assistant messages" || cmd === "AI , Highlight bot messages" || cmd === "Hey QuizzoneAI , highlight AI messages" || cmd === "Hey QuizzoneAI, highlight AI messages" || cmd === "Hey QuizzoneAI , highlight assistant messages" || cmd === "Hey QuizzoneAI, highlight assistant messages" || cmd === "Hey QuizzoneAI , highlight bot messages" || cmd === "Hey QuizzoneAI, highlight bot messages"){
    document.querySelectorAll(".message.ai .bubble")
      .forEach(el=>{
        el.style.boxShadow="0 0 0 2px #22c55e";
      });
    systemMessage("AI messages highlighted.");
    return true;
  }

  // HIGHLIGHT ALL MESSAGES
  if(cmd === "highlight all messages" || cmd === "AI , Highlight all messages" || cmd === "Hey QuizzoneAI , highlight all messages" || cmd === "Hey QuizzoneAI, highlight all messages" || cmd === "highlight all bubbles" || cmd === "AI , Highlight all bubbles" || cmd === "Hey QuizzoneAI , highlight all bubbles" || cmd === "Hey QuizzoneAI, highlight all bubbles" || cmd === "highlight messages" || cmd === "AI , Highlight messages" || cmd === "Hey QuizzoneAI , highlight messages" || cmd === "Hey QuizzoneAI, highlight messages" || cmd === "highlight bubbles" || cmd === "AI , Highlight bubbles" || cmd === "Hey QuizzoneAI , highlight bubbles" || cmd === "Hey QuizzoneAI, highlight bubbles" || cmd === "sabhi message chamka do beta" || cmd === "sabhi message chamka lala" || cmd === "sabhi bubbles chamka do beta" || cmd === "sabhi bubbles chamka lala" || cmd === "AI , सबही मेसेज चमका दो बेटा" || cmd === "AI , सबही मेसेज चमका लाला" || cmd === "Hey QuizzoneAI , सबही मेसेज चमका दो बेटा" || cmd === "Hey QuizzoneAI, सबही मेसेज चमका दो बेटा" || cmd === "Hey QuizzoneAI , सबही मेसेज चमका लाला" || cmd === "Hey QuizzoneAI, सबही मेसेज चमका लाला" || cmd === "AI , सबही बबल्स चमका दो बेटा" || cmd === "AI , सबही बबल्स चमका लाला" || cmd === "Hey QuizzoneAI , सबही बबल्स चमका दो बेटा" || cmd === "Hey QuizzoneAI, सबही बबल्स चमका दो बेटा" || cmd === "Hey QuizzoneAI , सबही बबल्स चमका लाला" || cmd === "Hey QuizzoneAI, सबही बबल्स चमका लाला" || cmd === "Make all messages highlighted" || cmd === "Make all bubbles highlighted"){
    document.querySelectorAll(".bubble")
      .forEach(el=>{
        el.style.boxShadow="0 0 0 2px #facc15";
      });
    systemMessage("All messages highlighted.");
    return true;
  }

  // HIDE MESSAGE BLOCK ( SET OF USER + AI MESSAGE ) WITH BLOCK ID 
  if(cmd.startsWith("hide message block id") || cmd.startsWith("hide message block with id") || cmd.startsWith("hide message block number") || cmd.startsWith("hide message block no") || cmd.startsWith("AI , Hide message block id") || cmd.startsWith("AI , Hide message block with id") || cmd.startsWith("AI , Hide message block number") || cmd.startsWith("AI , Hide message block no") || cmd.startsWith("Hey QuizzoneAI , hide message block id") || cmd.startsWith("Hey QuizzoneAI, hide message block id") || cmd.startsWith("Hey QuizzoneAI , hide message block with id") || cmd.startsWith("Hey QuizzoneAI, hide message block with id") || cmd.startsWith("Hey QuizzoneAI , hide message block number") || cmd.startsWith("Hey QuizzoneAI, hide message block number") || cmd.startsWith("Hey QuizzoneAI , hide message block no") || cmd.startsWith("Hey QuizzoneAI, hide message block no")){
    const id = cmd.split("=").pop()?.trim();
    if(id){
      const block = document.getElementById(id);
      if(block){
        block.style.display="none";
        systemMessage(`Message block ${id} hidden.`);
      } else {
        systemMessage(`Message block ${id} not found.`);
      }
    }
    return true;
  }

  // RESET MESSAGE STYLES
  if(cmd === "reset message styles" || cmd === "clear message styles" || cmd === "remove message styles" || cmd === "reset bubbles" || cmd === "clear bubbles" || cmd === "remove bubbles" || cmd === "AI , Reset message styles" || cmd === "AI , Clear message styles" || cmd === "AI , Remove message styles" || cmd === "AI , Reset bubbles" || cmd === "AI , Clear bubbles" || cmd === "AI , Remove bubbles" || cmd === "Hey QuizzoneAI , reset message styles" || cmd === "Hey QuizzoneAI, reset message styles" || cmd === "Hey QuizzoneAI , clear message styles" || cmd === "Hey QuizzoneAI, clear message styles" || cmd === "Hey QuizzoneAI , remove message styles" || cmd === "Hey QuizzoneAI, remove message styles" || cmd === "Hey QuizzoneAI , reset bubbles" || cmd === "Hey QuizzoneAI, reset bubbles" || cmd === "Hey QuizzoneAI , clear bubbles" || cmd === "Hey QuizzoneAI, clear bubbles" || cmd === "Hey QuizzoneAI , remove bubbles" || cmd === "Hey QuizzoneAI, remove bubbles"){
    document.querySelectorAll(".bubble")
      .forEach(el=>el.style.boxShadow="none");
    systemMessage("Message styles reset.");
    return true;
  }

  // COLLAPSE SIDEBAR
  if(cmd === "collapse sidebar" || cmd === "close sidebar" || cmd === "hide sidebar" || cmd === "minimize sidebar" || cmd === "shrink sidebar" || cmd === "AI , Collapse sidebar" || cmd === "AI , Close sidebar" || cmd === "AI , Hide sidebar" || cmd === "AI , Minimize sidebar" || cmd === "AI , Shrink sidebar" || cmd === "Hey QuizzoneAI , collapse sidebar" || cmd === "Hey QuizzoneAI, collapse sidebar" || cmd === "Hey QuizzoneAI , close sidebar" || cmd === "Hey QuizzoneAI, close sidebar" || cmd === "Hey QuizzoneAI , hide sidebar" || cmd === "Hey QuizzoneAI, hide sidebar" || cmd === "Hey QuizzoneAI , minimize sidebar" || cmd === "Hey QuizzoneAI, minimize sidebar" || cmd === "Hey QuizzoneAI , shrink sidebar" || cmd === "Hey QuizzoneAI, shrink sidebar"){
    document.querySelector(".sidebar").style.width="60px";
    systemMessage("Sidebar collapsed.");
    return true;
  }

  // EXPAND SIDEBAR
  if(cmd === "expand sidebar" || cmd === "open sidebar" || cmd === "show sidebar" || cmd === "unhide sidebar" || cmd === "reveal sidebar" || cmd === "AI , Expand sidebar" || cmd === "AI , Open sidebar" || cmd === "AI , Show sidebar" || cmd === "AI , Unhide sidebar" || cmd === "AI , Reveal sidebar" || cmd === "Hey QuizzoneAI , expand sidebar" || cmd === "Hey QuizzoneAI, expand sidebar" || cmd === "Hey QuizzoneAI , open sidebar" || cmd === "Hey QuizzoneAI, open sidebar" || cmd === "Hey QuizzoneAI , show sidebar" || cmd === "Hey QuizzoneAI, show sidebar" || cmd === "Hey QuizzoneAI , unhide sidebar" || cmd === "Hey QuizzoneAI, unhide sidebar" || cmd === "Hey QuizzoneAI , reveal sidebar" || cmd === "Hey QuizzoneAI, reveal sidebar"){
    document.querySelector(".sidebar").style.width="300px";
    systemMessage("Sidebar expanded.");
    return true;
  }

  // HIDE INPUT BOX
  if(cmd === "hide input" || cmd === "conceal input" || cmd === "close input" || cmd === "AI , Hide input box" || cmd === "AI , Conceal input box" || cmd === "AI , Close input box" || cmd === "Hey QuizzoneAI , hide input" || cmd === "Hey QuizzoneAI, hide input" || cmd === "Hey QuizzoneAI , conceal input" || cmd === "Hey QuizzoneAI, conceal input" || cmd === "Hey QuizzoneAI , close input" || cmd === "Hey QuizzoneAI, close input" || cmd === "AI , Close input box" || cmd === "AI , Hide input box" || cmd === "AI , Conceal input box"){
    document.querySelector(".input-box").style.display="none";
    systemMessage("Input box hidden.");
    return true;
  }

  // SHOW INPUT BOX
  if(cmd === "show input" || cmd === "unhide input" || cmd === "display input" || cmd === "reveal input" || cmd === "open input" || cmd === "AI , Show input box" || cmd === "AI , Unhide input box" || cmd === "AI , Display input box" || cmd === "AI , Reveal input box" || cmd === "AI , Open input box" || cmd === "Hey QuizzoneAI , show input" || cmd === "Hey QuizzoneAI, show input" || cmd === "Hey QuizzoneAI , unhide input" || cmd === "Hey QuizzoneAI, unhide input" || cmd === "Hey QuizzoneAI , display input" || cmd === "Hey QuizzoneAI, display input" || cmd === "Hey QuizzoneAI , reveal input" || cmd === "Hey QuizzoneAI, reveal input" || cmd === "Hey QuizzoneAI , open input" || cmd === "Hey QuizzoneAI, open input"){
    document.querySelector(".input-box").style.display="flex";
    systemMessage("Input box shown.");
    return true;
  }

    /* ================= SESSION & NAVIGATION ================= */

  // LOGOUT USER
  if(cmd === "logout" || cmd === "log out" || cmd === "sign out" || cmd === "signout" || cmd === "Hey QuizzoneAI , logout" || cmd === "Hey QuizzoneAI, logout" || cmd === "Hey QuizzoneAI , log out" || cmd === "Hey QuizzoneAI, log out" || cmd === "Hey QuizzoneAI , sign out" || cmd === "Hey QuizzoneAI, sign out" || cmd === "Hey QuizzoneAI , signout" || cmd === "Hey QuizzoneAI, signout" || cmd === "AI , Logout" || cmd === "AI , Log out" || cmd === "AI , Sign out" || cmd === "AI , Signout"){
    localStorage.removeItem("ActiveQuizzoneUser");
    systemMessage("You have been logged out. Redirecting...");
    setTimeout(()=>{
      window.location.href = "/Quizzone/Home/SignIn.htm";
    }, 1200);
    return true;
  }

  // SWITCH TO NEXT CHAT
  if(cmd === "next chat" || cmd === "go to next chat" || cmd === "open next chat" || cmd === "move to next chat" || cmd === "switch to next chat" || cmd === "Hey QuizzoneAI , go to next chat" || cmd === "Hey QuizzoneAI, go to next chat" || cmd === "Hey QuizzoneAI , open next chat" || cmd === "Hey QuizzoneAI, open next chat" || cmd === "Hey QuizzoneAI , move to next chat" || cmd === "Hey QuizzoneAI, move to next chat" || cmd === "Hey QuizzoneAI , switch to next chat" || cmd === "Hey QuizzoneAI, switch to next chat" || cmd === "Are AI , Agla chat khol do na" || cmd === "Khol agla chat AI" || cmd === "AI , Agla chat kholo" || cmd === "AI , Agla chat khol do" || cmd === "AI , Go to next chat" || cmd === "AI , Open next chat" || cmd === "AI , Move to next chat" || cmd === "AI , Switch to next chat"){
    const ids = Object.keys(chats);
    let idx = ids.indexOf(activeChatId);
    if(idx < ids.length - 1){
      activeChatId = ids[idx + 1];
      state.activeChatId = activeChatId;
      saveState();
      renderChatList();
      renderMessages();
      systemMessage("Moved to next chat.");
    }
    return true;
  }

  // SWITCH TO PREVIOUS CHAT
  if(cmd === "previous chat" || cmd === "prior chat" || cmd === "last chat before" || cmd === "go to previous chat" || cmd === "go to prior chat" || cmd === "open previous chat" || cmd === "open prior chat" || cmd === "move to previous chat" || cmd === "move to prior chat" || cmd === "switch to previous chat" || cmd === "switch to prior chat" || cmd === "Hey QuizzoneAI , go to previous chat" || cmd === "Hey QuizzoneAI, go to previous chat" || cmd === "Hey QuizzoneAI , open previous chat" || cmd === "Hey QuizzoneAI, open previous chat" || cmd === "Hey QuizzoneAI , move to previous chat" || cmd === "Hey QuizzoneAI, move to previous chat" || cmd === "Hey QuizzoneAI , switch to previous chat" || cmd === "Hey QuizzoneAI, switch to previous chat" || cmd === "Are AI , Pichla chat khol do na" || cmd === "Khol pichla chat AI" || cmd === "AI , Pichla chat kholo" || cmd === "AI , Pichla chat khol do" || cmd === "AI , Go to previous chat" || cmd === "AI , Open previous chat" || cmd === "AI , Move to previous chat" || cmd === "AI , Switch to previous chat"){
    const ids = Object.keys(chats);
    let idx = ids.indexOf(activeChatId);
    if(idx > 0){
      activeChatId = ids[idx - 1];
      state.activeChatId = activeChatId;
      saveState();
      renderChatList();
      renderMessages();
      systemMessage("Moved to previous chat.");
    }
    return true;
  }

  // SWITCH TO CHAT BY ID
  if(cmd.startsWith("go to chat id") || cmd.startsWith("open chat id") || cmd.startsWith("switch to chat id") || cmd.startsWith("move to chat id") || cmd.startsWith("Hey QuizzoneAI , open chat id") || cmd.startsWith("Hey QuizzoneAI, Open chat id") || cmd.startsWith("Hey QuizzoneAI , go to chat id") || cmd.startsWith("Hey QuizzoneAI, go to chat id") || cmd.startsWith("Hey QuizzoneAI , switch to chat id") || cmd.startsWith("Hey QuizzoneAI, switch to chat id") || cmd.startsWith("Hey QuizzoneAI , move to chat id") || cmd.startsWith("Hey QuizzoneAI, move to chat id") || cmd.startsWith("AI , Khol chat id") || cmd.startsWith("AI , Khol do chat id") || cmd.startsWith("AI , Jao chat id") || cmd.startsWith("AI , Jao to chat id") || cmd.startsWith("AI , Switch to chat id") || cmd.startsWith("AI , Move to chat id") || cmd.startsWith("AI , Open chat id") || cmd.startsWith("AI , Go to chat id")){
    const id = text.split("=").pop()?.trim();
    if(chats[id]){
      activeChatId = id;
      state.activeChatId = id;
      saveState();
      renderChatList();
      renderMessages();
      systemMessage(`Switched to chat ${id}.`);
    } else {
      systemMessage("Chat ID not found.");
    }
    return true;
  }

  // GO TO FIRST CHAT
  if(cmd === "first chat" || cmd === "go to first chat" || cmd === "open first chat" || cmd === "earliest chat" || cmd === "oldest chat" || cmd === "go to earliest chat" || cmd === "go to oldest chat" || cmd === "open earliest chat" || cmd === "open oldest chat" || cmd === "first" || cmd === "earliest" || cmd === "oldest" || cmd === "go to first" || cmd === "go to earliest" || cmd === "go to oldest" || cmd === "open first" || cmd === "open earliest" || cmd === "open oldest" || cmd === "move to first chat" || cmd === "move to earliest chat" || cmd === "move to oldest chat" || cmd === "switch to first chat" || cmd === "switch to earliest chat" || cmd === "switch to oldest chat" || cmd === "Hey QuizzoneAI , go to first chat" || cmd === "Hey QuizzoneAI, go to first chat" || cmd === "Hey QuizzoneAI , open first chat" || cmd === "Hey QuizzoneAI, open first chat" || cmd === "Hey QuizzoneAI , move to first chat" || cmd === "Hey QuizzoneAI, move to first chat" || cmd === "Hey QuizzoneAI , switch to first chat" || cmd === "Hey QuizzoneAI, switch to first chat" || cmd === "AI , Pehla chat kholo" || cmd === "AI , Pehla chat khol do" || cmd === "AI , Jao pehla chat" || cmd === "AI , Jao to pehla chat" || cmd === "AI , Go to first chat" || cmd === "AI , Open first chat" || cmd === "AI , Move to first chat" || cmd === "AI , Switch to first chat"){
    const first = Object.keys(chats)[0];
    activeChatId = first;
    state.activeChatId = first;
    saveState();
    renderChatList();
    renderMessages();
    systemMessage("Moved to first chat.");
    return true;
  }

  // GO TO LAST CHAT
  if(cmd === "last chat" || cmd === "latest chat" || cmd === "most recent chat" || cmd === "go to last chat" || cmd === "go to latest chat" || cmd === "go to most recent chat" || cmd === "open last chat" || cmd === "open latest chat" || cmd === "open most recent chat" || cmd === "last" || cmd === "latest" || cmd === "most recent" || cmd === "go to last" || cmd === "go to latest" || cmd === "go to most recent" || cmd === "open last" || cmd === "open latest" || cmd === "open most recent" || cmd === "move to last chat" || cmd === "move to latest chat" || cmd === "move to most recent chat" || cmd === "switch to last chat" || cmd === "switch to latest chat" || cmd === "switch to most recent chat" || cmd === "Hey QuizzoneAI , go to last chat" || cmd === "Hey QuizzoneAI, go to last chat" || cmd === "Hey QuizzoneAI , open last chat" || cmd === "Hey QuizzoneAI, open last chat" || cmd === "Hey QuizzoneAI , move to last chat" || cmd === "Hey QuizzoneAI, move to last chat" || cmd === "Hey QuizzoneAI , switch to last chat" || cmd === "Hey QuizzoneAI, switch to last chat" || cmd === "AI , Aakhri chat kholo" || cmd === "AI , Aakhri chat khol do" || cmd === "AI , Jao aakhri chat" || cmd === "AI , Jao to aakhri chat" || cmd === "AI , Go to last chat" || cmd === "AI , Open last chat" || cmd === "AI , Move to last chat" || cmd === "AI , Switch to last chat"){
    const ids = Object.keys(chats);
    activeChatId = ids[ids.length - 1];
    state.activeChatId = activeChatId;
    saveState();
    renderChatList();
    renderMessages();
    systemMessage("Moved to last chat.");
    return true;
  }

  // RELOAD QUIZZONEAI (SOFT)
  if(cmd === "reload ai" || cmd === "reload quizzone ai" || cmd === "reload quizzoneai" || cmd === "reload quizzone ai workspace" || cmd === "reload quizzone workspace" || cmd === "reload ai workspace" || cmd === "reload workspace ai" || cmd === "reload workspace quizzone" || cmd === "reload quizzone" || cmd === "reload workspace" || cmd === "refresh ai" || cmd === "refresh quizzone ai" || cmd === "refresh quizzoneai" || cmd === "refresh quizzone ai workspace" || cmd === "refresh quizzone workspace" || cmd === "refresh ai workspace" || cmd === "refresh workspace ai" || cmd === "refresh workspace quizzone" || cmd === "refresh quizzone" || cmd === "refresh workspace" || cmd === "reload" || cmd === "refresh" || cmd === "Hey QuizzoneAI , reload" || cmd === "Hey QuizzoneAI, reload" || cmd === "Hey QuizzoneAI , refresh" || cmd === "Hey QuizzoneAI, refresh" || cmd === "AI , Reload karo" || cmd === "AI , Refresh karo" || cmd === "AI , Reload" || cmd === "AI , Refresh"){
    systemMessage("Reloading QuizzoneAI workspace...");
    setTimeout(()=>location.reload(), 800);
    return true;
  }

  // RESET AI SESSION (KEEP LOGIN)
  if(cmd === "reset ai" || cmd === "reset quizzone ai" || cmd === "reset quizzoneai" || cmd === "reset quizzone ai workspace" || cmd === "reset quizzone workspace" || cmd === "reset ai workspace" || cmd === "reset workspace ai" || cmd === "reset workspace quizzone" || cmd === "reset quizzone" || cmd === "reset workspace" || cmd === "reset" || cmd === "restart ai" || cmd === "restart quizzone ai" || cmd === "restart quizzoneai" || cmd === "restart quizzone ai workspace" || cmd === "restart quizzone workspace" || cmd === "restart ai workspace" || cmd === "restart workspace ai" || cmd === "restart workspace quizzone" || cmd === "restart quizzone" || cmd === "restart workspace" || cmd === "restart"){
    localStorage.removeItem("QUIZZONE_AI_STATE");
    systemMessage("AI session reset. Reloading...");
    setTimeout(()=>location.reload(), 800);
    return true;
  }

  // LOCK WORKSPACE
  if(cmd === "lock workspace" || cmd === "lock quizzone ai workspace" || cmd === "lock quizzone workspace" || cmd === "lock ai workspace" || cmd === "lock workspace ai" || cmd === "lock workspace quizzone" || cmd === "lock ai" || cmd === "lock quizzone ai" || cmd === "lock quizzone" || cmd === "lock" || cmd === "lock workspace now" || cmd === "lock quizzone ai workspace now" || cmd === "lock quizzone workspace now" || cmd === "lock ai workspace now" || cmd === "lock workspace ai now" || cmd === "lock workspace quizzone now" || cmd === "lock ai now" || cmd === "lock quizzone ai now" || cmd === "lock quizzone now"){
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;
                  height:100vh;font-family:Segoe UI">
        <div style="padding:30px;border-radius:16px;
                    background:#020617;color:white;text-align:center">
          <h2>Workspace Locked</h2>
          <p>Refresh or <a href="/Quizzone/Home/SignIn.htm">login again</a> to continue.</p>
        </div>
      </div>`;
    return true;
  }

  // EXIT QUIZZONEAI SAFELY
  if(cmd === "exit ai" || cmd === "exit quizzone ai" || cmd === "close ai" || cmd === "close quizzone ai" || cmd === "quit ai" || cmd === "quit quizzone ai" || cmd === "exit quizzone" || cmd === "close quizzone" || cmd === "quit quizzone" || cmd === "exit" || cmd === "close" || cmd === "quit"){
    systemMessage("Exiting QuizzoneAI...");
    setTimeout(()=>{
      window.location.href = "/Quizzone/index.htm";
    }, 1200);
    return true;
  }

    /* ================= QUIZZONE INTERNAL LINKS ================= */

  // OPEN QUIZZONE HOME
  if(cmd === "open quizzone home" || cmd === "go to quizzone home" || cmd === "quizzone home" || cmd === "open home" || cmd === "go to home" || cmd === "home" || cmd === "Open Home" || cmd === "Open Quizzone Home"){
    systemMessage("Opening Quizzone Home…");
    window.location.href = "/Quizzone/index.htm";
    return true;
  }

  // OPEN DISCIPLINES
  if(cmd === "open disciplines" || cmd === "go to disciplines" || cmd === "disciplines" || cmd === "open subjects" || cmd === "go to subjects" || cmd === "subjects" || cmd === "open courses" || cmd === "go to courses" || cmd === "courses" || cmd === "open learning material" || cmd === "go to learning material" || cmd === "learning material" || cmd === "open syllabus" || cmd === "go to syllabus" || cmd === "syllabus" || cmd === "Open Courses" || cmd === "Open Subjects" || cmd === "Open Disciplines"){
    systemMessage("Opening Disciplines…");
    window.location.href = "/Quizzone/Disciplines/index.htm";
    return true;
  }

  // OPEN COMPETENCY TESTS
  if(cmd === "open competency tests" || cmd === "competency test" || cmd === "Go to Competency Tests"){
    systemMessage("Opening Competency Tests…");
    window.location.href = "/Quizzone/CompetancyTest/index.htm";
    return true;
  }

  // OPEN PROGRESS DASHBOARD
  if(cmd === "open progress" || cmd === "open progress dashboard" || cmd === "go to progress dashboard" || cmd === "go to progress" || cmd === "progress dashboard"){
    systemMessage("Opening Progress Dashboard…");
    window.location.href = "/Quizzone/Home/Progress.htm";
    return true;
  }

  // OPEN SETTINGS
  if(cmd === "open settings" || cmd === "go to settings" || cmd === "settings" || cmd === "open account settings" || cmd === "account settings"){
    systemMessage("Opening Account Settings…");
    window.location.href = "/Quizzone/Home/Setting.htm";
    return true;
  }

  // OPEN ABOUT QUIZZONE
  if(cmd === "open about quizzone" || cmd === "about quizzone" || cmd === "go to about quizzone" || cmd === "about"){
    systemMessage("Opening About Quizzone…");
    window.location.href = "/Quizzone/Documentary/OwnerMessageViewer.htm";
    return true;
  }

  /* ================= OWNER / CREATOR LINKS ================= */

  // OPEN CREATOR PORTFOLIO
  if(cmd === "open owner portfolio" || cmd === "open creator portfolio" || cmd === "creator portfolio" || cmd === "owner portfolio"){
    systemMessage("Opening creator portfolio…");
    window.open("https://akshat-881236.github.io/Portfolio-881236/", "_blank");
    return true;
  }

  // OPEN GITHUB
  if(cmd === "open github" || cmd === "open github profile" || cmd === "github profile" || cmd === "github" || cmd === "open owner github" || cmd === "open creator github" || cmd === "Akshat Prasad GitHub" || cmd === "open Akshat Prasad GitHub" || cmd === "open Akshat-881236 GitHub"){
    systemMessage("Opening GitHub profile…");
    window.open("https://github.com/Akshat-881236", "_blank");
    return true;
  }

  // OPEN LINKEDIN
  if(cmd === "open linkedin" || cmd === "open linkedin profile" || cmd === "linkedin profile" || cmd === "linkedin" || cmd === "open owner linkedin" || cmd === "open creator linkedin"){
    systemMessage("Opening LinkedIn profile…");
    window.open("https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=akshat-prasad-b53936379", "_blank");
    return true;
  }

  // OPEN EMAIL CLIENT
  if(cmd === "contact owner" || cmd === "email owner" || cmd === "contact creator" || cmd === "email creator" || cmd === "open email client" || cmd === "email Akshat Prasad" || cmd === "contact Akshat Prasad" || cmd === "email Akshat" || cmd === "contact Akshat"){
    systemMessage("Opening email client…");
    window.location.href = "mailto:akshatpsd2005@gmail.com";
    return true;
  }

  /* ================= OTHER PROJECTS ================= */

  // OPEN QUIZZONE PROJECT REPO
  if(cmd === "open quizzone project" || cmd === "open quizzone repository" || cmd === "quizzone project" || cmd === "quizzone repository"){
    systemMessage("Opening Quizzone Project Repository…");
    window.open("https://github.com/Akshat-881236/Quizzone", "_blank");
    return true;
  }

  // OPEN LEARNING CLUB
  if(cmd === "open learning club" || cmd === "learning club" || cmd === "open learning club project"){
    systemMessage("Opening Learning Club…");
    window.open("https://akshat-881236.github.io/LearningClub-Key-of-Success-Learning-Point/", "_blank");
    return true;
  }

  // OPEN ALL PROJECTS PAGE
  if(cmd === "open all projects" || cmd === "all projects" || cmd === "open projects page" || cmd === "projects page" || cmd === "open owner projects" || cmd === "open creator projects" || cmd === "Tell me about your other projects" || cmd === "show me your other projects" || cmd === "show all projects"){
    systemMessage("Opening all projects…");
    window.open("https://github.com/Akshat-881236", "_blank");
    return true;
  }

  // COMMAND TRIGGER GOOGLE SEARCH
  if(cmd.startsWith("search google for") || cmd.startsWith("google search for") || cmd.startsWith("search on google for") || cmd.startsWith("search in google for") || cmd.startsWith("Search Google for") || cmd.startsWith("Google search for") || cmd.startsWith("Search on Google for") || cmd.startsWith("Search in Google for") || cmd.startsWith("search google about") || cmd.startsWith("google search about") || cmd.startsWith("search on google about") || cmd.startsWith("search in google about") || cmd.startsWith("Search Google about") || cmd.startsWith("Google search about") || cmd.startsWith("Search on Google about") || cmd.startsWith("Search in Google about")){
    const query = text.split("for").pop()?.trim() ||
                  text.split("about").pop()?.trim();
    if(query){
      systemMessage(`Searching Google for "${query}"...`);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // COMMAND TRIGGER YOUTUBE SEARCH
  if(cmd.startsWith("search youtube for") || cmd.startsWith("youtube search for") || cmd.startsWith("search on youtube for") || cmd.startsWith("search in youtube for") || cmd.startsWith("Search YouTube for") || cmd.startsWith("YouTube search for") || cmd.startsWith("Search on YouTube for") || cmd.startsWith("Search in YouTube for") || cmd.startsWith("search youtube about") || cmd.startsWith("youtube search about") || cmd.startsWith("search on youtube about") || cmd.startsWith("search in youtube about") || cmd.startsWith("Search YouTube about") || cmd.startsWith("YouTube search about") || cmd.startsWith("Search on YouTube about") || cmd.startsWith("Search in YouTube about")){
    const query = text.split("for").pop()?.trim() ||
                  text.split("about").pop()?.trim();
    if(query){
      systemMessage(`Searching YouTube for "${query}"...`);
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // COMMAND TRIGGER WIKIPEDIA SEARCH
  if(cmd.startsWith("search wikipedia for") || cmd.startsWith("wikipedia search for") || cmd.startsWith("search on wikipedia for") || cmd.startsWith("search in wikipedia for") || cmd.startsWith("Search Wikipedia for") || cmd.startsWith("Wikipedia search for") || cmd.startsWith("Search on Wikipedia for") || cmd.startsWith("Search in Wikipedia for") || cmd.startsWith("search wikipedia about") || cmd.startsWith("wikipedia search about") || cmd.startsWith("search on wikipedia about") || cmd.startsWith("search in wikipedia about") || cmd.startsWith("Search Wikipedia about") || cmd.startsWith("Wikipedia search about") || cmd.startsWith("Search on Wikipedia about") || cmd.startsWith("Search in Wikipedia about")){
    const query = text.split("for").pop()?.trim() ||
                  text.split("about").pop()?.trim();
    if(query){
      systemMessage(`Searching Wikipedia for "${query}"...`);
      window.open(`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // COMMAND TRIGGER DUCKDUCKGO SEARCH
  if(cmd.startsWith("search duckduckgo for") || cmd.startsWith("duckduckgo search for") || cmd.startsWith("search on duckduckgo for") || cmd.startsWith("search in duckduckgo for") || cmd.startsWith("Search DuckDuckGo for") || cmd.startsWith("DuckDuckGo search for") || cmd.startsWith("Search on DuckDuckGo for") || cmd.startsWith("Search in DuckDuckGo for") || cmd.startsWith("search duckduckgo about") || cmd.startsWith("duckduckgo search about") || cmd.startsWith("search on duckduckgo about") || cmd.startsWith("search in duckduckgo about") || cmd.startsWith("Search DuckDuckGo about") || cmd.startsWith("DuckDuckGo search about") || cmd.startsWith("Search on DuckDuckGo about") || cmd.startsWith("Search in DuckDuckGo about")){
    const query = text.split("for").pop()?.trim() ||
                  text.split("about").pop()?.trim();
    if(query){
      systemMessage(`Searching DuckDuckGo for "${query}"...`);
      window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // COMMAND TRIGGER BING SEARCH
  if(cmd.startsWith("search bing for") || cmd.startsWith("bing search for") || cmd.startsWith("search on bing for") || cmd.startsWith("search in bing for") || cmd.startsWith("Search Bing for") || cmd.startsWith("Bing search for") || cmd.startsWith("Search on Bing for") || cmd.startsWith("Search in Bing for") || cmd.startsWith("search bing about") || cmd.startsWith("bing search about") || cmd.startsWith("search on bing about") || cmd.startsWith("search in bing about") || cmd.startsWith("Search Bing about") || cmd.startsWith("Bing search about") || cmd.startsWith("Search on Bing about") || cmd.startsWith("Search in Bing about")){
    const query = text.split("for").pop()?.trim() ||
                  text.split("about").pop()?.trim();
    if(query){
      systemMessage(`Searching Bing for "${query}"...`);
      window.open(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // LINKEDIN SEARCH
  if(cmd.startsWith("search linkedin for") || cmd.startsWith("linkedin search for") || cmd.startsWith("search on linkedin for") || cmd.startsWith("search in linkedin for") || cmd.startsWith("Search LinkedIn for") || cmd.startsWith("LinkedIn search for") || cmd.startsWith("Search on LinkedIn for") || cmd.startsWith("Search in LinkedIn for") || cmd.startsWith("search linkedin about") || cmd.startsWith("linkedin search about") || cmd.startsWith("search on linkedin about") || cmd.startsWith("search in linkedin about") || cmd.startsWith("Search LinkedIn about") || cmd.startsWith("LinkedIn search about") || cmd.startsWith("Search on LinkedIn about") || cmd.startsWith("Search in LinkedIn about")){
    const query = text.split("for").pop()?.trim() ||
                  text.split("about").pop()?.trim();
    if(query){
      systemMessage(`Searching LinkedIn for "${query}"...`);
      window.open(`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // SEARCH OWNER PORTFOLIO ON GOOGLE
  if(cmd === "search owner portfolio on google" || cmd === "search creator portfolio on google" || cmd === "search portfolio on google" || cmd === "google search owner portfolio" || cmd === "google search creator portfolio" || cmd === "google search portfolio" || cmd === "Search Owner Portfolio on Google" || cmd === "Search Creator Portfolio on Google" || cmd === "Search Portfolio on Google" || cmd === "Google Search Owner Portfolio" || cmd === "Google Search Creator Portfolio" || cmd === "Google Search Portfolio" || cmd === "Find Owner Portfolio on Google" || cmd === "Find Creator Portfolio on Google" || cmd === "Find Portfolio on Google" || cmd === "QuizzoneAI, search owner portfolio on Google" || cmd === "QuizzoneAI, search creator portfolio on Google" || cmd === "QuizzoneAI, search portfolio on Google" || cmd === "Hey QuizzoneAI, search owner portfolio on Google" || cmd === "Hey QuizzoneAI, search creator portfolio on Google" || cmd === "Hey QuizzoneAI, search portfolio on Google" || cmd === "Can you search owner portfolio on Google" || cmd === "Can you search creator portfolio on Google" || cmd === "Can you search portfolio on Google"){
    const query = "Akshat Prasad Portfolio";
    systemMessage(`<h1>I'm QuizzoneAI created by Akshat Prasad.</h1> Searching Google for "${query}"...`);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    return true;
  }

    // COMMAND TO CREATE A CUSTOM RESPONSE
  if(cmd.startsWith("teach ai that") || cmd.startsWith("quizzoneai, learn that") || cmd.startsWith("hey quizzoneai, learn that") || cmd.startsWith("you should know that")){
    const parts = text.split("that").pop()?.trim().split("is");
    if(parts && parts.length === 2){
      const key = parts[0].trim().toLowerCase();
      const value = parts[1].trim();
      if(key && value){
        KB.push({
          k: [key],
          type: "custom",
          tags: ["user-taught"],
          v: value
        });
        systemMessage(`Got it! I've learned that "${key}" is "${value}".`);
      } else {
        systemMessage("Please provide both a key and a value.");
      }
    } else {
      systemMessage("Please use the format: teach AI that [key] is [value].");
    }
    return true;
  }

  // EXECUTION BOX REQUEST IN WHICH WE CAN RUN ALL ABOVE COMMANDS WRT BOILERPLATE COMMANDS
  if(cmd === "execute all commands" || cmd === "run all commands" || cmd === "execute all" || cmd === "run all" || cmd === "open execution box" || cmd === "show execution box" || cmd === "activate execution box" || cmd === "launch execution box" || cmd === "Execute All Commands" || cmd === "Run All Commands" || cmd === "Open Execution Box" || cmd === "Show Execution Box" || cmd === "Activate Execution Box" || cmd === "Launch Execution Box" || cmd === "Can you open execution box" || cmd === "Can you show execution box" || cmd === "Can you activate execution box" || cmd === "Can you launch execution box" || cmd === "Hey QuizzoneAI, open execution box" || cmd === "Hey QuizzoneAI, show execution box" || cmd === "Hey QuizzoneAI, activate execution box" || cmd === "Hey QuizzoneAI, launch execution box"){
    systemMessage(`
      <b>Execution Box Activated</b><br>
      You can now run all available commands including boilerplate commands.
      Just type your command in the code container below and click on "Run Button".
      <pre contenteditable="true" id="execBox" style="min-height:80px;
            border:1px solid #ccc;padding:8px;
            border-radius:8px;outline:none;
            font-family:Segoe UI,monospace;
            box-shadow:0 0 5px rgba(0,0,0,0.1);
            margin-top:8px;"> 
// Example Command:
clear chat
new chat
rename chat = My New Chat
delete chat
list chats
pin chat
unpin chat
archive chat
restore chat
last message
delete last message
count messages
search message = keyword
toggle theme
dark mode
light mode
clear input
scroll bottom
help commands
add banner
clear chat html
add footer note = This is a footer note.
replace header title = New Title
add info card
inject css = .message.user { background: #e0f7fa; }
apply soft ui
reset styles
highlight user messages
highlight ai messages
reset message styles
collapse sidebar
expand sidebar
hide input
show input
logout
next chat
// Execute more commands seperated by comas ","
// Click on Edit Button to Edit Commands & then Click on Run Button to Execute.
      </pre>
      <button onclick="
        const cmds = document.getElementById('execBox').innerText.split('\\n');
        cmds.forEach(c => {
          document.getElementById('input').value = c;
          send();
        });
      " style="margin-top:8px;padding:8px 12px;
               background:#2563eb;color:white;
               border:none;border-radius:6px;
               cursor:pointer;">
        Run Commands
      </button>
    `);
    return true;
  }

  // COMMAND TO RETRIEVE CURRENT CHAT ID
  if(cmd === "what is my current chat id" || cmd === "current chat id" || cmd === "show current chat id" || cmd === "display current chat id" || cmd === "give me current chat id" || cmd === "tell me my current chat id" || cmd === "Can you tell me my current chat id" || cmd === "Hey QuizzoneAI, what is my current chat id" || cmd === "Hey QuizzoneAI, current chat id" || cmd === "Hey QuizzoneAI, show current chat id" || cmd === "Hey QuizzoneAI, display current chat id" || cmd === "Hey QuizzoneAI, give me current chat id"){
    systemMessage(`Your current chat ID is: <b>${activeChatId}</b>`);
    return true;
  }

  // COMMAND TO IMPORT ALL CHATS DATA IN WELL STYLE DISPLAY SHOWING CHAT IDS & TITLES AND ALL MESSAGES WITH ROLES & CONTENTS ALONG WITH TIMESTAMPS & IDS
  if(cmd === "export all chats data" || cmd === "get all chats data" || cmd === "show all chats data" || cmd === "display all chats data" || cmd === "give me all chats data" || cmd === "Can you give me all chats data" || cmd === "Hey QuizzoneAI, export all chats data" || cmd === "Hey QuizzoneAI, get all chats data" || cmd === "Hey QuizzoneAI, show all chats data" || cmd === "Hey QuizzoneAI, display all chats data" || cmd === "Hey QuizzoneAI, give me all chats data" || cmd === "Please export all chats data" || cmd === "Please get all chats data" || cmd === "Please show all chats data" || cmd === "Please display all chats data" || cmd === "Please give me all chats data" || cmd === "Kindly export all chats data" || cmd === "Kindly get all chats data" || cmd === "Kindly show all chats data" || cmd === "Kindly display all chats data" || cmd === "Kindly give me all chats data" || cmd === "Could you export all chats data" || cmd === "Could you get all chats data" || cmd === "Could you show all chats data" || cmd === "Could you display all chats data" || cmd === "Could you give me all chats data" || cmd === "I would like to export all chats data" || cmd === "I would like to get all chats data" || cmd === "I would like to show all chats data" || cmd === "I would like to display all chats data" || cmd === "I would like to have all chats data" || cmd === "I want to export all chats data" || cmd === "I want to get all chats data" || cmd === "I want to show all chats data" || cmd === "I want to display all chats data" || cmd === "I want to have all chats data" || cmd === "Export Chats" || cmd === "Get Chats" || cmd === "Show Chats" || cmd === "Display Chats" || cmd === "Give me Chats" || cmd === "Please Export Chats" || cmd === "Please Get Chats" || cmd === "Please Show Chats" || cmd === "Please Display Chats" || cmd === "Please Give me Chats" || cmd === "Kindly Export Chats" || cmd === "Kindly Get Chats" || cmd === "Kindly Show Chats" || cmd === "Kindly Display Chats" || cmd === "Kindly Give me Chats" || cmd === "Could you Export Chats" || cmd === "Could you Get Chats" || cmd === "Could you Show Chats" || cmd === "Could you Display Chats" || cmd === "Could you Give me Chats" || cmd === "I would like to Export Chats" || cmd === "I would like to Get Chats" || cmd === "I would like to Show Chats" || cmd === "I would like to Display Chats" || cmd === "I would like to Have Chats" || cmd === "I want to Export Chats" || cmd === "I want to Get Chats" || cmd === "I want to Show Chats" || cmd === "I want to Display Chats" || cmd === "I want to Have Chats" || cmd === "QuizzoneAI, export all chats data" || cmd === "QuizzoneAI, get all chats data" || cmd === "QuizzoneAI, show all chats data" || cmd === "QuizzoneAI, display all chats data" || cmd === "QuizzoneAI, give me all chats data" || cmd === "QuizzoneAI, Export Chats" || cmd === "QuizzoneAI, Get Chats" || cmd === "QuizzoneAI, Show Chats" || cmd === "QuizzoneAI, Display Chats" || cmd === "QuizzoneAI, Give me Chats" || cmd === "Exports Chats" || cmd === "Gets Chats" || cmd === "Shows Chats" || cmd === "Displays Chats" || cmd === "Gives me Chats" || cmd === "export chat data" || cmd === "get chat data" || cmd === "show chat data" || cmd === "display chat data" || cmd === "give me chat data" || cmd === "QuizzoneAI, export chat data" || cmd === "QuizzoneAI, get chat data" || cmd === "QuizzoneAI, show chat data" || cmd === "QuizzoneAI, display chat data" || cmd === "QuizzoneAI, give me chat data" || cmd === "exports chats" || cmd === "gets chats" || cmd === "shows chats" || cmd === "displays chats" || cmd === "gives me chats" || cmd === "export chat" || cmd === "get chat" || cmd === "show chat" || cmd === "display chat" || cmd === "give me chat" || cmd === "QuizzoneAI, export chat" || cmd === "QuizzoneAI, get chat" || cmd === "QuizzoneAI, show chat" || cmd === "QuizzoneAI, display chat" || cmd === "QuizzoneAI, give me chat"){
    let exportContent = `<b>All Chats Data Export</b><br>`;
    Object.values(chats).forEach(c => {
      exportContent += `<h3>Chat ID: ${c.id} | Title: ${c.title}</h3>`;
      c.messages.forEach(m => {
        exportContent += `
          <div style="margin-left:20px;
                      border-left:2px solid #ccc;
                      padding-left:10px;
                      margin-bottom:8px;">
            <b>Role:</b> ${m.role}<br>
            <b>Content:</b> ${m.content}<br>
            <b>Time:</b> ${m.time}<br>
            <b>Message ID:</b> ${m.id}
          </div>
        `;
      });
    });
    systemMessage(exportContent);
    return true;
  }

  // COMMANDS TO ENCRYPT OR DECRYPT MESSAGES OR CHATS - SIMULATED VIA REVERSING STRINGS FOR DEMO PURPOSES
  if(cmd.startsWith("encrypt message") || cmd.startsWith("decrypt message") || cmd.startsWith("encrypt chat") || cmd.startsWith("decrypt chat")){
    const action = cmd.split(" ")[0]; // encrypt or decrypt
    const target = cmd.split(" ")[1]; // message or chat
    if(target === "message"){
      const lastMsg = chats[activeChatId].messages[chats[activeChatId].messages.length - 1];
      if(lastMsg){
        if(action === "encrypt"){
          lastMsg.content = lastMsg.content.split("").reverse().join("");
          systemMessage("Last message encrypted.");
        } else {
          lastMsg.content = lastMsg.content.split("").reverse().join("");
          systemMessage("Last message decrypted.");
        }
        renderMessages();
        saveState();
      } else {
        systemMessage("No messages to process.");
      }
    } else if(target === "chat"){
      chats[activeChatId].messages.forEach(m => {
        if(action === "encrypt"){
          m.content = m.content.split("").reverse().join("");
        } else {
          m.content = m.content.split("").reverse().join("");
        }
      });
      systemMessage(`All messages in current chat ${action}ed.`);
      renderMessages();
      saveState();
    }
    return true;
  }

  // COMMANDS THAT MAKE ALL TEXT UPPERCASE OR LOWERCASE IN ALL MESSAGES OF CURRENT CHAT AND MAKE IT REFLECTED IMMEDIATELY BUT NOT SAVE PERMANENTLY
  if(cmd === "uppercase all messages" || cmd === "make all messages uppercase" ||
     cmd === "lowercase all messages" || cmd === "make all messages lowercase" ||
     cmd === "convert all messages to uppercase" || cmd === "convert all messages to lowercase" ||
     cmd === "Uppercase all messages" || cmd === "Make all messages uppercase" ||
     cmd === "Lowercase all messages" || cmd === "Make all messages lowercase"){
    const toUpper = cmd.includes("uppercase");
    chats[activeChatId].messages.forEach(m => {
      m.content = toUpper ? m.content.toUpperCase() : m.content.toLowerCase();
    });
    systemMessage(`All messages converted to ${toUpper ? "UPPERCASE" : "lowercase"}.`);
    renderMessages();
    return true;
  }

  if(cmd === "reset ai knowledge" || cmd === "clear ai knowledge" || cmd === "forget user taught data" || cmd === "reset learned data" || cmd === "clear learned data" || cmd === "forget custom responses" || cmd === "reset custom responses"){
    KB = KB.filter(d => d.type !== "custom");
    systemMessage("AI knowledge reset. All user-taught data forgotten.");
    return true;
  }

  // COMMAND TO RETRIEVE TEACH DATA FROM KNOWLEDGE BASE
  if(cmd.startsWith("what do you know about") || cmd.startsWith("tell me about") || cmd.startsWith("give me information about") || cmd.startsWith("what have you learned about") || cmd.startsWith("Do you know about") || cmd.startsWith("Hey QuizzoneAI, what do you know about") || cmd.startsWith("Hey QuizzoneAI, tell me about") || cmd.startsWith("Hey QuizzoneAI, give me information about") || cmd.startsWith("Hey QuizzoneAI, what have you learned about") || cmd.startsWith("Can you tell me about") || cmd.startsWith("Can you give me information about") || cmd.startsWith("Can you tell me what you know about") || cmd.startsWith("Can you tell me what you have learned about") || cmd.startsWith("Tell me about") || cmd.startsWith("Give me information about") || cmd.startsWith("What do you know about") || cmd.startsWith("What have you learned about")){
    const topic = text.split("about").pop()?.trim().toLowerCase();
    if(topic){
      const entry = KB.find(d => d.k.includes(topic));
      if(entry){
        systemMessage(`I know that "${topic}" is: ${entry.v}`);
      } else {
        systemMessage(`I don't have any information about "${topic}".`);
      }
    } else {
      systemMessage("Please specify a topic to inquire about.");
    }
    return true;
  }

  // COMMAND TO RETRIEVE TEACH DATA FROM KNOWLEDGE BASE
if (
  cmd.includes("what do you know about") ||
  cmd.includes("tell me about") ||
  cmd.includes("give me information about") ||
  cmd.includes("what have you learned about")
){
  const topic = text.toLowerCase().split("about").pop()?.trim();

  if(!topic){
    systemMessage("Please specify a topic to inquire about.");
    return true;
  }

  // intelligent KB search
  const entry = KB.find(d =>
    d.k.some(key => topic.includes(key) || key.includes(topic))
  );

  if(entry){
    systemMessage(`
      <b>Here is what I know about "${topic}":</b><br><br>
      ${entry.v}
      <br><br>
      <span style="font-size:11px;color:gray">
        Type: ${entry.type || "general"} |
        Tags: ${(entry.tags || []).join(", ")}
      </span>
    `);
  } else {
    systemMessage(`I don't have information about "<b>${topic}</b>" yet.`);
  }

  return true;
}

// ================= ACTIVE USER INFO COMMANDS =================

// WHO AM I
if(cmd === "who am i" || cmd === "tell me who i am" || cmd === "what is my name" || cmd === "can you tell me who i am" || cmd === "Hey QuizzoneAI, who am I" || cmd === "Hey QuizzoneAI, tell me who I am" || cmd === "Hey QuizzoneAI, what is my name" || cmd === "Can you tell me who I am" || cmd === "Can you tell me my name" || cmd === "Please tell me who I am" || cmd === "Kindly tell me who I am" || cmd === "Could you tell me who I am" || cmd === "I would like to know who I am" || cmd === "I want to know who I am"){
  systemMessage(`You are <b>${user.username}</b>.`);
  return true;
}

// FULL PROFILE
if(cmd === "my profile" || cmd === "my details" || cmd === "show my profile" || cmd === "display my profile" || cmd === "give me my profile" || cmd === "Can you show my profile" || cmd === "Hey QuizzoneAI, show my profile" || cmd === "Please show my profile" || cmd === "Kindly show my profile" || cmd === "Could you show my profile" || cmd === "I would like to see my profile" || cmd === "I want to see my profile"){
  systemMessage(`
     Yes , Sure whyn't here are your details:<br><br>
    <b>Your Profile</b><br><br>
    Name: ${user.username || "N/A"}<br>
    Email: ${user.email || "N/A"}<br>
    Contact: ${user.contact || "N/A"}<br>
    DOB: ${user.dob || "N/A"}<br>
    Address: ${user.address || "N/A"}
  `);
  return true;
}

// NAME
if(cmd === "my name" || cmd === "what is my name" || cmd === "tell me my name" || cmd === "can you tell me my name" || cmd === "Hey QuizzoneAI, what is my name" || cmd === "Hey QuizzoneAI, tell me my name" || cmd === "Please tell me my name" || cmd === "Kindly tell me my name" || cmd === "Could you tell me my name" || cmd === "I would like to know my name" || cmd === "I want to know my name"){
  systemMessage(`Your name is <b>${user.username}</b>.`);
  return true;
}

// EMAIL
if(cmd === "my email" || cmd === "what is my email" || cmd === "tell me my email" || cmd === "can you tell me my email" || cmd === "Hey QuizzoneAI, what is my email" || cmd === "Hey QuizzoneAI, tell me my email" || cmd === "Please tell me my email" || cmd === "Kindly tell me my email" || cmd === "Could you tell me my email" || cmd === "I would like to know my email" || cmd === "I want to know my email"){
  systemMessage(`Your registered email is <b>${user.email || "Not available"}</b>.`);
  return true;
}

// CONTACT
if(cmd === "my contact" || cmd === "what is my contact" || cmd === "tell me my contact" || cmd === "can you tell me my contact" || cmd === "Hey QuizzoneAI, what is my contact" || cmd === "Hey QuizzoneAI, tell me my contact" || cmd === "Please tell me my contact" || cmd === "Kindly tell me my contact" || cmd === "Could you tell me my contact" || cmd === "I would like to know my contact" || cmd === "I want to know my contact" || cmd === "my phone number" || cmd === "what is my phone number" || cmd === "tell me my phone number" || cmd === "can you tell me my phone number" || cmd === "Hey QuizzoneAI, what is my phone number" || cmd === "Hey QuizzoneAI, tell me my phone number" || cmd === "Please tell me my phone number" || cmd === "Kindly tell me my phone number" || cmd === "Could you tell me my phone number" || cmd === "I would like to know my phone number" || cmd === "I want to know my phone number"){
  systemMessage(`Your contact number is <b>${user.contact || "Not available"}</b>.`);
  return true;
}

// DATE OF BIRTH
if(cmd === "my dob" || cmd === "my date of birth" || cmd === "what is my dob" || cmd === "what is my date of birth" || cmd === "tell me my dob" || cmd === "tell me my date of birth" || cmd === "can you tell me my dob" || cmd === "can you tell me my date of birth" || cmd === "Hey QuizzoneAI, what is my dob" || cmd === "Hey QuizzoneAI, what is my date of birth" || cmd === "Hey QuizzoneAI, tell me my dob" || cmd === "Hey QuizzoneAI, tell me my date of birth" || cmd === "Please tell me my dob" || cmd === "Please tell me my date of birth" || cmd === "Kindly tell me my dob" || cmd === "Kindly tell me my date of birth" || cmd === "Could you tell me my dob" || cmd === "Could you tell me my date of birth" || cmd === "I would like to know my dob" || cmd === "I would like to know my date of birth" || cmd === "I want to know my dob" || cmd === "I want to know my date of birth" || cmd === "my birthday" || cmd === "what is my birthday" || cmd === "tell me my birthday" || cmd === "can you tell me my birthday" || cmd === "Hey QuizzoneAI, what is my birthday" || cmd === "Hey QuizzoneAI, tell me my birthday" || cmd === "Please tell me my birthday" || cmd === "Kindly tell me my birthday" || cmd === "Could you tell me my birthday" || cmd === "I would like to know my birthday" || cmd === "I want to know my birthday"){
  systemMessage(`Your date of birth is <b>${user.dob || "Not available"}</b>.`);
  return true;
}

// ADDRESS
if(cmd === "my address"){
  systemMessage(`Your address is <b>${user.address || "Not available"}</b>.`);
  return true;
}

// ROLE / ACCOUNT TYPE
if(cmd === "my role"){
  systemMessage(`Your account role is <b>${user.role || "Standard User"}</b>.`);
  return true;
}

// ================= USER STATS / PROGRESS =================
if (
  cmd.includes("my stats") ||
  cmd.includes("my report") ||
  cmd.includes("my progress") ||
  cmd.includes("mera progress") ||
  cmd.includes("mera progress kya hai") ||
  cmd.includes("mera progress kya") ||
  cmd.includes("tell me about my statistics")
){
  const u = user || {}; // safe reference

  const totalScore = u.totalScore ?? 0;
  const quizzesCompleted = u.quizzesCompleted ?? 0;
  const blogsRead = u.blogsRead ?? 0;
  const competencyTests = u.competencyTests ?? 0;
  const chatsCreated = Object.keys(chats || {}).length;

  systemMessage(`
    <div class="qa-stats">
      <h3>📊 Your Activity Report</h3>
      <ul style="line-height:1.8">
        <li><b>Total Score:</b> ${totalScore}</li>
        <li><b>Quizzes Completed:</b> ${quizzesCompleted}</li>
        <li><b>Blogs Read:</b> ${blogsRead}</li>
        <li><b>Competency Tests:</b> ${competencyTests}</li>
        <li><b>Chats Created:</b> ${chatsCreated}</li>
      </ul>
    </div>
  `);

  return true;
}

/* ================= REAL-TIME / STATUS COMMANDS ================= */

// 1️⃣ CURRENT TIME
if(
  cmd.includes("current time") ||
  cmd.includes("what is the time") ||
  cmd.includes("time now") ||
  cmd.includes("abhi time kya hai")
){
  const time = new Date().toLocaleTimeString();
  systemMessage(`🕒 Current time is <b>${time}</b>.`);
  return true;
}

// 2️⃣ CURRENT DATE
if(
  cmd.includes("current date") ||
  cmd.includes("today date") ||
  cmd.includes("aaj ki date") ||
  cmd.includes("date today")
){
  const date = new Date().toLocaleDateString();
  systemMessage(`📅 Today's date is <b>${date}</b>.`);
  return true;
}

// 3️⃣ DAY TODAY
if(
  cmd.includes("day today") ||
  cmd.includes("what day is today") ||
  cmd.includes("aaj ka din") ||
  cmd.includes("today is which day")
){
  const day = new Date().toLocaleDateString(undefined,{weekday:"long"});
  systemMessage(`📆 Today is <b>${day}</b>.`);
  return true;
}

// 4️⃣ FULL DATE & TIME
if(
  cmd.includes("current date and time") ||
  cmd.includes("date and time") ||
  cmd.includes("abhi date aur time")
){
  const now = new Date();
  systemMessage(`
    ⏰ <b>Current Date & Time</b><br>
    Date: ${now.toLocaleDateString()}<br>
    Time: ${now.toLocaleTimeString()}
  `);
  return true;
}

// 5️⃣ LIVE CLOCK (UPDATES EVERY SECOND)
if(
  cmd.includes("live time") ||
  cmd.includes("start clock") ||
  cmd.includes("show live time") ||
  cmd.includes("live clock") ||
  cmd.includes("real-time clock") ||
  cmd.includes("real time clock")
){
  const id = genId(6);
  systemMessage(`
    ⏱️ <b>Live Clock</b><br>
    <span id="live-clock-${id}"></span>
  `);

  const interval = setInterval(()=>{
    const el = document.getElementById(`live-clock-${id}`);
    if(!el){
      clearInterval(interval);
      return;
    }
    el.innerText = new Date().toLocaleTimeString();
  },1000);

  return true;
}

// 6️⃣ SYSTEM STATUS
if(
  cmd.includes("system status") ||
  cmd.includes("are you online") ||
  cmd.includes("ai status")
){
  systemMessage(`
    🟢 <b>System Status</b><br>
    QuizzoneAI is running normally.<br>
    Status: <b>Online & Active</b>
  `);
  return true;
}

// 7️⃣ TIME ZONE
if(
  cmd.includes("time zone") ||
  cmd.includes("timezone") ||
  cmd.includes("which time zone")
){
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  systemMessage(`🌍 Your time zone is <b>${tz}</b>.`);
  return true;
}

// 8️⃣ SESSION STATUS
if(
  cmd.includes("session status") ||
  cmd.includes("current session") ||
  cmd.includes("my session") ||
  cmd.includes("session info")
){
  systemMessage(`
    🔐 <b>Session Info</b><br>
    User: ${user.username || "Guest"}<br>
    Active Chat ID: ${activeChatId}<br>
    Chats Loaded: ${Object.keys(chats||{}).length}
  `);
  return true;
}

// ARTHIMETIC CALCULATIONS
if(
  cmd.startsWith("calculate") || cmd.startsWith("what is") || cmd.startsWith("compute") || cmd.startsWith("solve") ||
  cmd.startsWith("Hal Kare") || cmd.startsWith("Solve kare") || cmd.startsWith("Calculate") || cmd.startsWith("Solve") || cmd.startsWith("Compute") || cmd.startsWith("What is") || cmd.startsWith("Can you calculate") || cmd.startsWith("Can you compute") || cmd.startsWith("Can you solve") || cmd.startsWith("Hey QuizzoneAI, calculate") || cmd.startsWith("Hey QuizzoneAI, compute") || cmd.startsWith("Hey QuizzoneAI, solve")
){
  let expression = text;
  expression = expression.replace(/calculate|compute|solve|what is|Hal Kare|Solve kare|Calculate|Solve|Compute|Can you calculate|Can you compute|Can you solve|Hey QuizzoneAI, calculate|Hey QuizzoneAI, compute|Hey QuizzoneAI, solve/gi, "").trim();
  // Understanding basic arithmetic expressions using symbols and words
  expression = expression.replace(/plus/gi, "+")
                         .replace(/minus/gi, "-")
                         .replace(/times|multiplied by/gi, "*")
                         .replace(/divided by/gi, "/")
                         .replace(/into/gi, "*")
                         .replace(/by/gi, "/");
  try {
    const result = eval(expression);
    systemMessage(`The result of <b>${expression}</b> is <b>${result}</b>.`);
  } catch (e) {
    systemMessage("Sorry, I couldn't compute that expression.");
  }
  return true;
}

// 4 + 3 , 7-2 , 5*6 , 8/4 , 7 * 7 / 2 + 3 - 1 , {23 + 7} /5 * 3^2 + 8  
if(/^[0-9+\-*/().\s^{}]+$/.test(cmd)){
  let expression = cmd;
  expression = expression.replace(/{/g, "(").replace(/}/g, ")");
  expression = expression.replace(/\^/g, "**");
  try {
    const result = eval(expression);
    systemMessage(`The result of <b>${expression}</b> is <b>${result}</b>.`);
  } catch (e) {
    systemMessage("Sorry, I couldn't compute that expression.");
  }
  return true;
}

// Trigger birthday wish on command with too short phrases
if(cmd === "wish me happy birthday" || cmd === "wish me a happy birthday" || cmd === "can you wish me happy birthday" || cmd === "can you wish me a happy birthday" || cmd === "Hey QuizzoneAI, wish me happy birthday" || cmd === "Hey QuizzoneAI, wish me a happy birthday" || cmd === "Please wish me happy birthday" || cmd === "Kindly wish me happy birthday" || cmd === "Could you wish me happy birthday" || cmd === "I would like to be wished happy birthday" || cmd === "I want to be wished happy birthday" || cmd === "Happy Birthday" || cmd === "happy birthday" || cmd === "It's my birthday" || cmd === "Today is my birthday" || cmd === "My birthday is today" || cmd === "Can you wish me a happy birthday" || cmd === "Can you wish me happy birthday" || cmd === "Hey QuizzoneAI, can you wish me happy birthday" || cmd === "Hey QuizzoneAI, can you wish me a happy birthday" || cmd === "Please wish me a happy birthday" || cmd === "Kindly wish me a happy birthday" || cmd === "Could you wish me a happy birthday" || cmd === "I would like to be wished a happy birthday" || cmd === "I want to be wished a happy birthday"|| cmd === "Birthday" || cmd === "birthday" || cmd === "It's birthday" || cmd === "Today is birthday" || cmd === "Birthday is today" || cmd === "Can you wish me birthday" || cmd === "Hey QuizzoneAI, can you wish me birthday" || cmd === "Please wish me birthday" || cmd === "Kindly wish me birthday" || cmd === "Could you wish me birthday" || cmd === "I would like to be wished birthday" || cmd === "I want to be wished birthday"){
  // Check if today is user's birthday
  const today = new Date();
  const dob = new Date(user.dob);
  if(dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()){
    systemMessage(`🎉 Happy Birthday, ${user.username}! Wishing you a fantastic year ahead filled with joy and success! 🎂`);
  } else {
    systemMessage(`It's not your birthday today, but I wish you a happy day nonetheless! 🎉. Your birthaday is ${dob.toDateString()}. I hope you have a wonderful day!`);
  }
  return true;
}

if(
  cmd === "update profile" || cmd === "edit profile" || cmd === "change profile info" || cmd === "modify profile details" || cmd === "update my profile" || cmd === "edit my profile" || cmd === "change my profile info" || cmd === "modify my profile details" || cmd === "Hey QuizzoneAI, update profile" || cmd === "Hey QuizzoneAI, edit profile" || cmd === "Hey QuizzoneAI, change profile info" || cmd === "Hey QuizzoneAI, modify profile details" || cmd === "Please update profile" || cmd === "Please edit profile" || cmd === "Please change profile info" || cmd === "Please modify profile details" || cmd === "Kindly update profile" || cmd === "Kindly edit profile" || cmd === "Kindly change profile info" || cmd === "Kindly modify profile details" || cmd === "Could you update profile" || cmd === "Could you edit profile" || cmd === "Could you change profile info" || cmd === "Could you modify profile details" || cmd === "I would like to update my profile" || cmd === "I would like to edit my profile" || cmd === "I would like to change my profile info" || cmd === "I would like to modify my profile details" || cmd === "I want to update my profile" || cmd === "I want to edit my profile" || cmd === "I want to change my profile info" || cmd === "I want to modify my profile details" || cmd === "profile update" || cmd === "profile edit" || cmd === "change profile" || cmd === "modify profile" || cmd === "update my profile info" || cmd === "edit my profile info" || cmd === "change my profile" || cmd === "modify my profile" || cmd === "QuizzoneAI, update profile" || cmd === "QuizzoneAI, edit profile" || cmd === "QuizzoneAI, change profile info" || cmd === "QuizzoneAI, modify profile details"
){
  systemMessage(`
    <b>QuizzoneAI Profile Commands</b><br><br>

    <b>Update Fields:</b><br>
    • update name = Your Name<br>
    • update email = your@email.com<br>
    • update dob = YYYY-MM-DD (18+ required)<br>
    • update contact no = 10 digit number<br>
    • update address = Your Address<br><br>

    <b>Photo:</b><br>
    • update profile photo<br><br>

    <b>Password:</b><br>
    • update password<br>
    • verify otp = 123456<br><br>

    <b>Danger Zone (GDPR):</b><br>
    • delete my account<br><br>

    All actions are audited and secured.
  `);
  return true;
}

if(cmd.startsWith("update ")){
  const parts = cmd.split("=");
  if(parts.length !== 2){
    systemMessage("❌ Invalid format. Use: update field = value");
    return true;
  }

  const field = parts[0].replace("update","").trim();
  const value = parts[1].trim();

  // DUPLICATE CHECK FUNCTION
  function duplicateCheck(predicate){
    return allUsers.find(u => u.email !== user.email && predicate(u));
  }

  switch(field){

    case "name":
      user.username = value;
      logAudit("Name updated via AI");
      systemMessage(`✅ Name updated to <b>${value}</b>`);
      break;

    case "father name":
      user.fatherName = value;
      logAudit("Father Name updated via AI");
      systemMessage(`✅ Father Name updated to <b>${value}</b>`);
      break;

    case "email":
      if(duplicateCheck(u => u.email === value)){
        systemMessage("❌ Email already exists.");
        return true;
      }
      user.email = value;
      logAudit("Email updated via AI");
      systemMessage(`✅ Email updated.`);
      break;

    case "dob":
      const dob = new Date(value);
      const age = Math.abs(new Date(Date.now()-dob).getUTCFullYear()-1970);
      if(age < 18){
        systemMessage("❌ Age must be 18+.");
        return true;
      }
      user.dob = value;
      logAudit("DOB updated via AI");
      systemMessage(`✅ DOB updated.`);
      break;

    case "contact no":
      if(!/^\d{10}$/.test(value)){
        systemMessage("❌ Contact must be 10 digits.");
        return true;
      }
      if(duplicateCheck(u => u.contact === value)){
        systemMessage("❌ Contact number already exists.");
        return true;
      }
      user.contact = value;
      logAudit("Contact updated via AI");
      systemMessage(`✅ Contact updated.`);
      break;

    case "address":
      user.address = value;
      logAudit("Address updated via AI");
      systemMessage(`✅ Address updated.`);
      break;

    default:
      systemMessage("❌ Unknown field.");
      return true;
  }

  saveUserData(user);
  return true;
}

if(cmd === "update profile photo"){
  systemMessage(`
    📸 <b>Profile Photo Update</b><br><br>
    For security reasons, photo upload is handled via the Settings page.<br><br>

    👉 <a href="/Quizzone/Home/Setting.htm" target="_blank">
    Click here to upload your new passport-size photo
    </a><br><br>

    ✔ Your image will be matched with your current photo<br>
    ✔ Checked against existing accounts<br>
    ✔ Audit logged from QuizzoneAI
  `);
  logAudit("Profile photo update initiated");
  return true;
}

let aiOTP = null;

if(cmd === "update password"){
  aiOTP = Math.floor(100000 + Math.random()*900000).toString();
  systemMessage(`🔐 OTP sent (mock): <b>${aiOTP}</b><br>
  Use: <code>verify otp = ${aiOTP}</code>`);
  logAudit("Password OTP sent via AI");
  return true;
}

if(cmd.startsWith("verify otp =")){
  const otp = cmd.split("=").pop().trim();
  if(otp !== aiOTP){
    systemMessage("❌ Invalid OTP.");
    return true;
  }

  systemMessage(`
    ✅ OTP verified.<br><br>
    <a href="/Quizzone/Home/Setting.htm" target="_blank">
    Click here to update your password securely
    </a>
  `);

  logAudit("OTP verified via AI");
  return true;
}

user._gdprStep = user._gdprStep || 0;

if(cmd === "delete my account"){
  user._gdprStep = 1;
  systemMessage(`⚠️ This will permanently delete your account. Type: <b>confirm delete</b><br> Why delete? We value your presence. If you have concerns, please reach out to support. You can submit feedback at <a href='https://akshat-881236.github.io/Portfolio-881236/feedback.htm' target='_blank'>Feedback Page</a>. We are always here to help!`);
  return true;
}

if(cmd === "confirm delete" && user._gdprStep === 1){
  user._gdprStep = 2;
  systemMessage(`⚠️ Second confirmation required. Type: <b>final delete</b> <br> This action is irreversible. All your data will be permanently removed from your local storage. Please ensure you have backed up any important information before proceeding. We are sorry to see you go. If you have any feedback, please share it at <a href='https://akshat-881236.github.io/Portfolio-881236/feedback.htm' target='_blank'>Feedback Page</a>.<br> Type <b>final delete</b> to proceed.`);
  return true;
}

if(cmd === "final delete" && user._gdprStep === 2){
  user._gdprStep = 0;
  logAudit("Account deleted via AI (GDPR)");

  localStorage.setItem(
    "QuizzoneUsersDB",
    JSON.stringify(allUsers.filter(u => u.email !== user.email))
  );
  localStorage.removeItem("ActiveQuizzoneUser");

  systemMessage(`🗑️ Your account has been permanently deleted. <br> Thank you for using Quizzone. We hope to see you again soon!. <b>Note:</b> Your data is securely removed from your device storage and you have to create another account to use the service again. However , QuizzoneAI service is also accessible without account setup in Guest mode. So continue your chatting experience as a Guest user!<br><br> 
  <h1>Goodbye, ${user.username}!</h1>
  <p>We're sad to see you go. If you ever change your mind, we'll be here to welcome you back with open arms.</p>
  <p>Wishing you all the best in your future endeavors!</p>
  <p>— The Quizzone Team</p>
  <p>Owner : Akshat Prasad</p>
  <p>Contact : 7838250289 / 9953854901</p>
  <p>Email : akshatpsd2005@gmail.com</p>
  <p>Visit <a href="https://akshat-881236.github.io/Portfolio-881236/" target="_blank">My Portfolio to explore more of our projects</a></p>
  If you have any questions or need assistance, feel free to reach out to us at any time.
  Type "How to set up new account" to create a new account and start using QuizzoneAI again!
  `);
  return true;
}

if(user._gdprStep > 0){
  systemMessage("❌ Deletion process underway. Please complete the previous steps.");
  return true;
}

if(cmd === "how to set up new account" || cmd === "how to create new account" || cmd === "account setup instructions" || cmd === "create new account instructions" || cmd === "please guide me to set up new account" || cmd === "kindly guide me to create new account" || cmd === "i want to set up a new account" || cmd === "i want to create a new account" || cmd === "guide me to set up new account" || cmd === "guide me to create new account" || cmd === "help me set up new account" || cmd === "help me create new account" || cmd === "How to set up new account" || cmd === "QuizzoneAI, how to create new account" || cmd === "QuizzoneAI, how to set up new account" || cmd === "Please guide me to create new account" || cmd === "Kindly guide me to set up new account" || cmd === "Could you guide me to create new account" || cmd === "Could you guide me to set up new account" || cmd === "I would like to set up a new account" || cmd === "I would like to create a new account" || cmd === "How to set up an account" || cmd === "How to create an account" || cmd === "Account setup instructions" || cmd === "Create new account instructions" || cmd === "Please guide me to set up a account" || cmd === "Kindly guide me to create an account" || cmd === "I want to set up an account" || cmd === "I want to create an account" || cmd === "Guide me to set up a account" || cmd === "Guide me to create an account" || cmd === "Help me set up an account" || cmd === "Help me create an account" || cmd === "QuizzoneAI, how to create an account" || cmd === "QuizzoneAI, how to set up an account" || cmd === "Please guide me to create an account" || cmd === "Kindly guide me to set up an account" || cmd === "Could you guide me to create an account" || cmd === "Could you guide me to set up an account" || cmd === "I would like to set up an account" || cmd === "I would like to create an account" || cmd === "how to set up an account" || cmd === "how to create an account"){
  systemMessage(`
    <b>Account Setup Instructions</b><br><br>
    1. Go to the <a href="/Quizzone/Home/SignUp.htm" target="_blank">Registration Page</a>.<br>
    2. Fill in your details: Name, Email, Password, Contact, DOB, Address.<br>
    3. Click "Register" to create your account.<br>
    4. Log in using your email and password on the <a href="/Quizzone/Home/SignIn.htm" target="_blank">Login Page</a>.<br><br>  OR <br><br>
    You can also use the "Guest Mode" to access QuizzoneAI without an account. In this mode , Use special commands that are use to edit profile . By default , When you edit your name in Guest mode , the edited name saved in Active Quizzone User and or using this trick you can create your account without reaching out to Registration page.<br><br>
    6. You can update you other details uaing QuizzoneAI commands after logging in.<br><br>
    7. Or Go to Settings page after logging in to update your profile photo and password securely.<br><br>
    8. But those who login using this trick in Guest mode , their data is stored only in local storage and not in Users DB until they register properly using Registration page.<br><br>
    9. Additionally , first time user can't update their email via setting page and they have to use QuizzoneAI commands to update their email to avoid duplicates in Users DB.<br><br>
    10. For any assistance , feel free to reach out to our support team.<br><br>
    Enjoy using QuizzoneAI with your new account! 🎉
  `);
  return true;
}

if(
  cmd === "export my data" ||
  cmd === "download my data"
){

  if(!user.privacyConsent){
    systemMessage("❌ Please accept privacy policy before exporting your data.");
    return true;
  }

  const html = `
    <h2>My Quizzone Account Data</h2>
    <ul>
      <li>Name: ${user.username || "N/A"}</li>
      <li>Email: ${user.email || "N/A"}</li>
      <li>Contact: ${user.contact || "N/A"}</li>
      <li>DOB: ${user.dob || "N/A"}</li>
      <li>Address: ${user.address || "N/A"}</li>
      <li>Role: ${user.role || "User"}</li>
    </ul>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "My_Quizzone_Data.html";
  a.click();

  logAudit("User exported own data (HTML)");

  systemMessage("✅ Your personal data has been downloaded successfully.");
  return true;
}

// COMMAND TO EXPORT DATA (ADMIN ONLY)
if (
  cmd === "export all data" ||
  cmd === "export all account data" ||
  cmd === "download all data" ||
  cmd === "download all account data" ||
  cmd === "please export all data" ||
  cmd === "kindly export all account data" ||
  cmd === "i want to export all data" ||
  cmd === "i want to download my data" ||
  cmd === "quizzoneai, export my data" ||
  cmd === "quizzoneai, download my data"
) {
  // PREPARE HTML DATA
  let data = `
    <h2>Quizzone User Data Export</h2>

    <h3>Active Admin Details</h3>
    <ul>
      <li><b>Name:</b> ${user.username || "N/A"}</li>
      <li><b>Email:</b> ${user.email || "N/A"}</li>
      <li><b>Contact:</b> ${user.contact || "N/A"}</li>
      <li><b>DOB:</b> ${user.dob || "N/A"}</li>
      <li><b>Address:</b> ${user.address || "N/A"}</li>
      <li><b>Role:</b> ${user.role || "Admin"}</li>
    </ul>

    <h3>All Users in Database</h3>
    <ul>
      ${allUsers.map(u => `
        <li>
          <b>Name:</b> ${u.username || "N/A"},
          <b>Email:</b> ${u.email || "N/A"},
          <b>Contact:</b> ${u.contact || "N/A"},
          <b>DOB:</b> ${u.dob || "N/A"},
          <b>Address:</b> ${u.address || "N/A"},
          <b>Role:</b> ${u.role || "User"}
        </li>
      `).join("")}
    </ul>
  `;

  // DOWNLOAD HTML FILE
  const blob = new Blob([data], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "QuizzoneUserData.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // AUDIT LOG
  logAudit("ADMIN exported all users data via AI");

  // SYSTEM MESSAGE
  systemMessage(`
    ✅ <b>Admin export completed successfully.</b><br><br>
    📁 File: <b>QuizzoneUserData.html</b><br><br>
    ⚠️ This file contains all users data. Handle responsibly.<br><br>
    Akshat Prasad
  `);

  return true;
}
  return false; // not a command
}