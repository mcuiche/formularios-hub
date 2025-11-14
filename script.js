document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
         FUNCIÓN COPIAR
  ============================ */
  function configurarCopiado(btnId, resultadoId) {
    const btn = document.getElementById(btnId);
    const resultado = document.getElementById(resultadoId);

    if (btn) {
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(resultado.textContent);
        btn.textContent = "Copiado";
        setTimeout(() => btn.textContent = "Copiar texto", 1500);
      });
    }
  }

  /* ===========================
       VALIDACIÓN DE CHECK
  ============================ */

  function validarDireccion(checkId) {
    const check = document.getElementById(checkId);
    return check && check.checked;
  }

  /* ===========================
        FORMULARIO FTTH
  ============================ */

  const btnFTTH = document.getElementById("generarBtn");
  if (btnFTTH) {
    btnFTTH.addEventListener("click", () => {
      if (!validarDireccion("direccionCheck")) {
        alert("Debes confirmar la dirección antes de generar el texto.");
        return;
      }

      const ubicacion = document.getElementById("ubicacion").value.trim();
      const contacto = document.getElementById("contacto").value.trim();
      const comentario = document.getElementById("comentario").value.trim();
      const potencia = document.getElementById("potencia").value.trim();
      const desconexiones = document.getElementById("desconexiones").value.trim();

      let texto = `RECLAMO FTTH\n`;
      texto += `Dirección: Verificada\n`;
      if (ubicacion) texto += `Ubicación: ${ubicacion}\n`;
      texto += `Contacto: ${contacto}\n`;
      texto += `Comentario: ${comentario}\n`;
      texto += `Potencia ONT: ${potencia}\n`;
      texto += `Desconexiones (7 días): ${desconexiones}`;

      document.getElementById("resultado").textContent = texto;
      document.getElementById("resultadoContainer").style.display = "block";
      document.getElementById("copiarBtn").disabled = false;
    });

    configurarCopiado("copiarBtn", "resultado");
  }

  /* ===========================
        FORMULARIO ADSL
  ============================ */

  const btnADSL = document.getElementById("generarBtn_adsl");
  if (btnADSL) {
    btnADSL.addEventListener("click", () => {

      if (!validarDireccion("direccionCheck_adsl")) {
        alert("Debes confirmar la dirección antes de generar el texto.");
        return;
      }

      const ubicacion = document.getElementById("ubicacion_adsl").value.trim();
      const contacto = document.getElementById("contacto_adsl").value.trim();
      const comentario = document.getElementById("comentario_adsl").value.trim();

      let modem = document.getElementById("modem").value;
      if (modem === "otro") modem = document.getElementById("otroModem").value.trim();

      const rateUp = document.getElementById("rate_up").value.trim();
      const rateDown = document.getElementById("rate_down").value.trim();

      const snrUp = document.getElementById("snr_up").value.trim();
      const snrDown = document.getElementById("snr_down").value.trim();

      const attUp = document.getElementById("att_up").value.trim();
      const attDown = document.getElementById("att_down").value.trim();

      const desconexiones = document.getElementById("desconexiones_adsl").value.trim();

      let texto = `RECLAMO ADSL\n`;
      texto += `Dirección: Verificada\n`;
      if (ubicacion) texto += `Ubicación: ${ubicacion}\n`;
      texto += `Contacto: ${contacto}\n`;
      texto += `Comentario: ${comentario}\n`;
      texto += `Módem: ${modem}\n`;
      texto += `Rate: ${rateUp}/${rateDown} Kbps\n`;
      texto += `SNR: ${snrUp}/${snrDown} dBm\n`;
      texto += `Atenuación: ${attUp}/${attDown} dBm\n`;
      texto += `Desconexiones (7 días): ${desconexiones}`;

      document.getElementById("resultado_adsl").textContent = texto;
      document.getElementById("resultadoContainer_adsl").style.display = "block";
      document.getElementById("copiarBtn_adsl").disabled = false;
    });

    configurarCopiado("copiarBtn_adsl", "resultado_adsl");

    // Mostrar campo "otro módem"
    const modemSelect = document.getElementById("modem");
    const otroModem = document.getElementById("otroModemContainer");

    modemSelect.addEventListener("change", () => {
      otroModem.style.display = modemSelect.value === "otro" ? "block" : "none";
    });
  }

  /* ===========================
        FORMULARIO WIRELESS
  ============================ */

  const btnWLS = document.getElementById("generarBtn_wireless");
  if (btnWLS) {

    // Mostrar CCQ / Cadenas
    const tipoSenal = document.getElementById("tipo_senal");
    const senalCCQ = document.getElementById("senalCCQ");
    const senalCadenas = document.getElementById("senalCadenas");

    tipoSenal.addEventListener("change", () => {
      if (tipoSenal.value === "ccq") {
        senalCCQ.style.display = "block";
        senalCadenas.style.display = "none";
      } else if (tipoSenal.value === "cadenas") {
        senalCCQ.style.display = "none";
        senalCadenas.style.display = "block";
      } else {
        senalCCQ.style.display = "none";
        senalCadenas.style.display = "none";
      }
    });

    btnWLS.addEventListener("click", () => {

      if (!validarDireccion("direccionCheck_wireless")) {
        alert("Debes confirmar la dirección antes de generar el texto.");
        return;
      }

      const ubicacion = document.getElementById("ubicacion_wireless").value.trim();
      const contacto = document.getElementById("contacto_wireless").value.trim();
      const comentario = document.getElementById("comentario_wireless").value.trim();

      const accesoRouter = document.querySelector("input[name='acceso_router']:checked")?.value || "No informado";
      const accesoVoip = document.querySelector("input[name='acceso_voip']:checked")?.value || "No informado";
      const sipRegistro = document.querySelector("input[name='sip_registro']:checked")?.value || "No informado";

      const tipo = document.getElementById("tipo_senal").value;

      let texto = `RECLAMO WIRELESS\n`;
      texto += `Dirección: Verificada\n`;
      if (ubicacion) texto += `Ubicación: ${ubicacion}\n`;
      texto += `Contacto: ${contacto}\n`;
      texto += `Comentario: ${comentario}\n`;
      texto += `Acceso Router: ${accesoRouter}\n`;
      texto += `Acceso VoIP: ${accesoVoip}\n`;
      texto += `SIP Registro: ${sipRegistro}\n`;

      if (tipo === "ccq") {
        const dbm = document.getElementById("senal_dbm").value.trim();
        const ccq = document.getElementById("senal_ccq").value.trim();

        texto += `Señal CCQ:\n`;
        texto += `Señal: ${dbm} dBm\n`;
        texto += `CCQ: ${ccq} %\n`;

      } else if (tipo === "cadenas") {
        const antP = document.getElementById("antena_principal").value.trim();
        const ant1 = document.getElementById("antena_c1").value.trim();
        const ant2 = document.getElementById("antena_c2").value.trim();
        const antDelta = document.getElementById("antena_delta").value.trim();

        const apP = document.getElementById("ap_principal").value.trim();
        const ap1 = document.getElementById("ap_c1").value.trim();
        const ap2 = document.getElementById("ap_c2").value.trim();
        const apDelta = document.getElementById("ap_delta").value.trim();

        texto += `Señal por Cadenas:\n`;
        texto += `Señal Antena: ${antP} (${ant1} / ${ant2}) Δ ${antDelta} dBm\n`;
        texto += `Señal AP: ${apP} (${ap1} / ${ap2}) Δ ${apDelta} dBm\n`;
      }

      const desconexiones = document.getElementById("desconexiones_wireless").value.trim();
      texto += `Desconexiones (7 días): ${desconexiones}`;

      document.getElementById("resultado_wireless").textContent = texto;
      document.getElementById("resultadoContainer_wireless").style.display = "block";
      document.getElementById("copiarBtn_wireless").disabled = false;
    });

    configurarCopiado("copiarBtn_wireless", "resultado_wireless");
  }

});
