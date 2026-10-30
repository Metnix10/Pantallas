document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".post-card").forEach(card => {
    const details = card.querySelector(".post-details");
    const expand = card.querySelector(".expand-button");
    const commentToggle = card.querySelector(".comment-toggle");
    const openDetails = () => {
      if (!details) return;
      details.hidden = false;
      if (expand) { expand.setAttribute("aria-expanded", "true"); expand.textContent = "Ocultar detalles⌃"; }
    };
    if (expand) expand.addEventListener("click", () => {
      const opening = details.hidden;
      details.hidden = !opening;
      expand.setAttribute("aria-expanded", String(opening));
      expand.textContent = opening ? "Ocultar detalles⌃" : "Ver publicación⌄";
    });
    if (commentToggle) commentToggle.addEventListener("click", () => { openDetails(); details.querySelector("input")?.focus(); });
    const like = card.querySelector(".like-button");
    if (like) like.addEventListener("click", () => {
      const count = like.querySelector(".like-count");
      const active = like.classList.toggle("liked");
      count.textContent = String(Number(count.textContent) + (active ? 1 : -1));
      like.firstChild.textContent = active ? "♥ Me gusta " : "♡ Me gusta ";
    });
    const form = card.querySelector(".comment-form");
    if (form) form.addEventListener("submit", e => {
      e.preventDefault();
      const input = form.elements.comment;
      const value = input.value.trim();
      if (!value) return;
      const item = document.createElement("div"); item.className = "comment";
      const name = document.createElement("strong"); name.textContent = "Tú";
      const text = document.createElement("p"); text.textContent = value;
      item.append(name, text); form.previousElementSibling.append(item); input.value = "";
    });
    const share = card.querySelector(".share-button");
    if (share) share.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(location.href); share.textContent = "✓ Enlace copiado"; }
      catch { share.textContent = "Enlace: " + location.href; }
    });
  });
  const markRead = document.getElementById("markRead");
  if (markRead) markRead.addEventListener("click", () => {
    document.querySelectorAll(".notification.unread").forEach(n => n.classList.remove("unread"));
    const count = document.getElementById("notificationCount"); if (count) count.textContent = "0";
    markRead.textContent = "Todo leído";
  });
  const followersButton = document.getElementById("followersButton");
  if (followersButton) followersButton.addEventListener("click", () => {
    const list = document.getElementById("followersList"); list.hidden = !list.hidden;
  });
  const followingButton = document.getElementById("followingButton");
  if (followingButton) followingButton.addEventListener("click", () => {
    const list = document.getElementById("followersList"); list.hidden = false;
    list.querySelector("h3").textContent = "Personas que sigues";
  });
  const chat = document.getElementById("chatPanel");
  const messageUser = document.getElementById("messageUser");
  if (messageUser && chat) messageUser.addEventListener("click", () => { chat.hidden = false; chat.scrollIntoView({behavior:"smooth",block:"center"}); document.getElementById("chatInput").focus(); });
  const closeChat = document.getElementById("closeChat");
  if (closeChat && chat) closeChat.addEventListener("click", () => { chat.hidden = true; });
  const chatForm = document.getElementById("chatForm");
  if (chatForm) chatForm.addEventListener("submit", e => {
    e.preventDefault(); const input = document.getElementById("chatInput"); const value = input.value.trim(); if (!value) return;
    const msg = document.createElement("div"); msg.className = "message sent";
    const span = document.createElement("span"); span.textContent = value;
    const time = document.createElement("small"); time.textContent = new Date().toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"});
    msg.append(span,time); document.getElementById("chatMessages").append(msg); input.value = "";
    document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
  });
  const edit = document.getElementById("editProfile");
  if (edit) edit.addEventListener("click", () => alert("La edición del perfil se conectará cuando se implemente el backend."));
});