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

      let texto = `RECLAMO FTTH\n`;
      texto += `Dirección: Verificada \n`;
      if (ubicacion) texto += `Ubicación: ${ubicacion}\n`;
      texto += `Contacto: ${contacto}\n`;
      texto += `Comentario: ${comentario}\n`;
      texto += `Potencia ONT: ${potencia}\n`;
      texto += `Desconexiones (7 días): ${desconexiones}`;

      resultado.textContent = texto;
      resultadoContainer.style.display = "block";
      copiarBtn.disabled = false;
    });
  }

  if (copiarBtn) {
    copiarBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(resultado.textContent);
      copiarBtn.textContent = "Copiado";
      setTimeout(() => copiarBtn.textContent = "Copiar texto", 1500);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const generarADSLBtn = document.getElementById("generarADSLBtn");
  const copiarADSLBtn = document.getElementById("copiarADSLBtn");
  const resultadoADSL = document.getElementById("resultadoADSL");
  const resultadoADSLContainer = document.getElementById("resultadoADSLContainer");
  const direccionADSLCheck = document.getElementById("direccionADSLCheck");

  if (generarADSLBtn) {
    generarADSLBtn.addEventListener("click", () => {
      if (!direccionADSLCheck.checked) {
        alert("Debes confirmar la dirección antes de generar el texto.");
        return;
      }

      const ubicacion = document.getElementById("ubicacionADSL").value.trim();
      const contacto = document.getElementById("contactoADSL").value.trim();
      const comentario = document.getElementById("comentarioADSL").value.trim();

      const modemSelect = document.getElementById("modemSelect");
      let modem = modemSelect.value;

      // Si elige "Otro", toma el texto escrito
      if (modem === "otro") {
        modem = document.getElementById("modemOtro").value.trim() || "No especificado";
      }

      const rateUp = document.getElementById("rateUp").value.trim();
      const rateDown = document.getElementById("rateDown").value.trim();

      const snrUp = document.getElementById("snrUp").value.trim();
      const snrDown = document.getElementById("snrDown").value.trim();

      const atenuUp = document.getElementById("atenuUp").value.trim();
      const atenuDown = document.getElementById("atenuDown").value.trim();

      const desconexiones = document.getElementById("desconexionesADSL").value.trim();

      let texto = `RECLAMO ADSL\n`;
      texto += `Dirección: Verificada\n`;
      if (ubicacion) texto += `Ubicación: ${ubicacion}\n`;
      texto += `Contacto: ${contacto}\n`;
      texto += `Comentario: ${comentario}\n`;
      texto += `Modem: ${modem}\n`;
      texto += `Rate: ${rateUp} / ${rateDown} Kbps\n`;
      texto += `SNR: ${snrUp} / ${snrDown} dBm\n`;
      texto += `Atenuación: ${atenuUp} / ${atenuDown} dBm\n`;
      texto += `Desconexiones (7 días): ${desconexiones}`;

      resultadoADSL.textContent = texto;
      resultadoADSLContainer.style.display = "block";
      copiarADSLBtn.disabled = false;
    });
  }

  if (copiarADSLBtn) {
    copiarADSLBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(resultadoADSL.textContent);
      copiarADSLBtn.textContent = "Copiado";
      setTimeout(() => copiarADSLBtn.textContent = "Copiar texto", 1500);
    });
  }
});
