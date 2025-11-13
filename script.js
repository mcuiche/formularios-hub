document.addEventListener("DOMContentLoaded", () => {
  const generarBtn = document.getElementById("generarBtn");
  const copiarBtn = document.getElementById("copiarBtn");
  const resultado = document.getElementById("resultado");
  const resultadoContainer = document.getElementById("resultadoContainer");
  const direccionCheck = document.getElementById("direccionCheck");

  if (generarBtn) {
    generarBtn.addEventListener("click", () => {
      if (!direccionCheck.checked) {
        alert("Debes confirmar la dirección antes de generar el texto.");
        return;
      }

      const ubicacion = document.getElementById("ubicacion").value.trim();
      const contacto = document.getElementById("contacto").value.trim();
      const comentario = document.getElementById("comentario").value.trim();
      const potencia = document.getElementById("potencia").value.trim();
      const desconexiones = document.getElementById("desconexiones").value.trim();

      let texto = `📡 RECLAMO FTTH\n`;
      texto += `📍 Dirección: Verificada ✅\n`;
      if (ubicacion) texto += `📌 Ubicación: ${ubicacion}\n`;
      texto += `👤 Contacto: ${contacto}\n`;
      texto += `📝 Comentario: ${comentario}\n`;
      texto += `💡 Potencia ONT: ${potencia}\n`;
      texto += `🔄 Desconexiones (7 días): ${desconexiones}`;

      resultado.textContent = texto;
      resultadoContainer.style.display = "block";
      copiarBtn.disabled = false;
    });
  }

  if (copiarBtn) {
    copiarBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(resultado.textContent);
      copiarBtn.textContent = "✅ Copiado";
      setTimeout(() => copiarBtn.textContent = "Copiar texto", 1500);
    });
  }
});
