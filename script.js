document.addEventListener("DOMContentLoaded", () => {

  /* -------------------- FTTH -------------------- */
  const genFTTH = document.getElementById("generarBtn");
  if (genFTTH) {
    genFTTH.addEventListener("click", () => {
      const check = document.getElementById("direccionCheck");
      if (!check.checked) return alert("Debes confirmar la dirección.");

      const ubic = document.getElementById("ubicacion").value;
      const cont = document.getElementById("contacto").value;
      const com = document.getElementById("comentario").value;
      const pot = document.getElementById("potencia").value;
      const des = document.getElementById("desconexiones").value;

      const txt =
`RECLAMO FTTH
Dirección: Verificada
${ubic ? `Ubicación: ${ubic}\n` : ""}Contacto: ${cont}
Comentario: ${com}
Potencia ONT: ${pot}
Desconexiones (7 días): ${des}`;

      document.getElementById("resultado").textContent = txt;
      document.getElementById("resultadoContainer").style.display = "block";
      document.getElementById("copiarBtn").disabled = false;
    });
  }


  /* -------------------- ADSL -------------------- */
  const genADSL = document.getElementById("generarBtn_adsl");
  if (genADSL) {
    genADSL.addEventListener("click", () => {
      const check = document.getElementById("direccionCheck_adsl");
      if (!check.checked) return alert("Debes confirmar la dirección.");

      const ubic = document.getElementById("ubicacion_adsl").value;
      const cont = document.getElementById("contacto_adsl").value;
      const com = document.getElementById("comentario_adsl").value;

      let modem = document.getElementById("modem").value;
      if (modem === "otro") modem = document.getElementById("otroModem").value;

      const rateUp = document.getElementById("rate_up").value;
      const rateDown = document.getElementById("rate_down").value;

      const snrUp = document.getElementById("snr_up").value;
      const snrDown = document.getElementById("snr_down").value;

      const attUp = document.getElementById("att_up").value;
      const attDown = document.getElementById("att_down").value;

      const des = document.getElementById("desconexiones_adsl").value;

      const txt =
`RECLAMO ADSL
Dirección: Verificada
${ubic ? `Ubicación: ${ubic}\n` : ""}Contacto: ${cont}
Comentario: ${com}
Módem: ${modem}
Rate: ${rateUp}/${rateDown} Kbps
SNR: ${snrUp}/${snrDown} dBm
Atenuación: ${attUp}/${attDown} dBm
Desconexiones (7 días): ${des}`;

      document.getElementById("resultado_adsl").textContent = txt;
      document.getElementById("resultadoContainer_adsl").style.display = "block";
      document.getElementById("copiarBtn_adsl").disabled = false;
    });
  }

  /* Mostrar campo "otro módem" */
  const modemSelect = document.getElementById("modem");
  if (modemSelect) {
    modemSelect.addEventListener("change", () => {
      document.getElementById("otroModemContainer").style.display =
        modemSelect.value === "otro" ? "block" : "none";
    });
  }


  /* -------------------- WIRELESS -------------------- */
  const tipoSenal = document.getElementById("tipo_senal");
  if (tipoSenal) {
    tipoSenal.addEventListener("change", () => {
      document.getElementById("ccq_block").style.display =
        tipoSenal.value === "ccq" ? "block" : "none";

      document.getElementById("cadenas_block").style.display =
        tipoSenal.value === "cadenas" ? "block" : "none";
    });
  }

  const genWireless = document.getElementById("generarBtn_wireless");
  if (genWireless) {
    genWireless.addEventListener("click", () => {
      const check = document.getElementById("direccionCheck_wireless");
      if (!check.checked) return alert("Debes confirmar la dirección.");

      const ubic = document.getElementById("ubicacion_wireless").value;
      const cont = document.getElementById("contacto_wireless").value;
      const com = document.getElementById("comentario_wireless").value;

      const accRouter = document.querySelector("input[name='acceso_router']:checked")?.value || "-";
      const accVoip = document.querySelector("input[name='acceso_voip']:checked")?.value || "-";
      const sip = document.querySelector("input[name='sip_registro']:checked")?.value || "-";

      const tipo = document.getElementById("tipo_senal").value;

      let senalTxt = "";

      if (tipo === "ccq") {
        const s = document.getElementById("ccq_senal").value;
        const c = document.getElementById("ccq_valor").value;
        senalTxt =
`Señal CCQ:
Señal: ${s} dBm
CCQ: ${c}%`;
      }

      if (tipo === "cadenas") {
        const ant = document.getElementById("cadena_antena").value;
        const ap = document.getElementById("cadena_ap").value;

        senalTxt =
`Señal Cadenas:
Antena: ${ant}
AP: ${ap}`;
      }

      const des = document.getElementById("desconexiones_wireless").value;

      const txt =
`RECLAMO WIRELESS
Dirección: Verificada
${ubic ? `Ubicación: ${ubic}\n` : ""}Contacto: ${cont}
Comentario: ${com}
Acceso Router: ${accRouter}
Acceso VoIP: ${accVoip}
SIP Registro: ${sip}

${senalTxt}

Desconexiones (7 días): ${des}`;

      document.getElementById("resultado_wireless").textContent = txt;
      document.getElementById("resultadoContainer_wireless").style.display = "block";
      document.getElementById("copiarBtn_wireless").disabled = false;
    });
  }
/* -------- BOTONES DE COPIAR (FTTH, ADSL, WIRELESS) -------- */
const copiarFTTH = document.getElementById("copiarBtn");
if (copiarFTTH) {
  copiarFTTH.addEventListener("click", () => {
    const txt = document.getElementById("resultado").textContent;
    navigator.clipboard.writeText(txt);
    copiarFTTH.textContent = "¡Copiado!";
    setTimeout(() => copiarFTTH.textContent = "Copiar texto", 1200);
  });
}

const copiarADSL = document.getElementById("copiarBtn_adsl");
if (copiarADSL) {
  copiarADSL.addEventListener("click", () => {
    const txt = document.getElementById("resultado_adsl").textContent;
    navigator.clipboard.writeText(txt);
    copiarADSL.textContent = "¡Copiado!";
    setTimeout(() => copiarADSL.textContent = "Copiar texto", 1200);
  });
}

const copiarWireless = document.getElementById("copiarBtn_wireless");
if (copiarWireless) {
  copiarWireless.addEventListener("click", () => {
    const txt = document.getElementById("resultado_wireless").textContent;
    navigator.clipboard.writeText(txt);
    copiarWireless.textContent = "¡Copiado!";
    setTimeout(() => copiarWireless.textContent = "Copiar texto", 1200);
  });
}

});
