// ============================================
// UTILIDADES GENERALES
// ============================================

/**
 * Función reutilizable para copiar texto al portapapeles
 * @param {string} resultadoId - ID del elemento que contiene el texto
 * @param {HTMLElement} boton - Botón que se presionó
 */
function copiarAlPortapapeles(resultadoId, boton) {
  const texto = document.getElementById(resultadoId).textContent;
  navigator.clipboard.writeText(texto).then(() => {
    const textoOriginal = boton.textContent;
    boton.textContent = "¡Copiado!";
    setTimeout(() => {
      boton.textContent = textoOriginal;
    }, 1200);
  });
}

/**
 * Obtiene el valor de un radio button seleccionado
 * @param {string} nombre - Nombre del grupo de radio buttons
 * @returns {string} - Valor seleccionado o "-"
 */
function obtenerRadioSeleccionado(nombre) {
  const seleccionado = document.querySelector(`input[name='${nombre}']:checked`);
  return seleccionado ? seleccionado.value : "-";
}

/**
 * Obtiene el valor de un input, con valor por defecto si está vacío
 * @param {string} id - ID del elemento
 * @param {string} valorPorDefecto - Valor a devolver si está vacío
 * @returns {string}
 */
function obtenerValor(id, valorPorDefecto = "") {
  const elemento = document.getElementById(id);
  return elemento ? elemento.value || valorPorDefecto : valorPorDefecto;
}

/**
 * Muestra/oculta un elemento según condición
 * @param {string} id - ID del elemento
 * @param {boolean} mostrar - Si debe mostrarse o no
 */
function toggleElemento(id, mostrar) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.style.display = mostrar ? "block" : "none";
  }
}

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  inicializarTemaOscuro();
  inicializarFormularios();
});

// ============================================
// TEMA OSCURO / CLARO
// ============================================

function inicializarTemaOscuro() {
  // Aplicar tema guardado
  const temaGuardado = localStorage.getItem("theme");
  if (temaGuardado === "dark") {
    document.body.classList.add("dark");
  }

  // Botón para alternar tema
  const botonTema = document.getElementById("toggleTheme");
  if (botonTema) {
    botonTema.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const temaActual = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", temaActual);
    });
  }
}

// ============================================
// INICIALIZACIÓN DE FORMULARIOS
// ============================================

function inicializarFormularios() {
  // Reclamos técnicos
  inicializarFTTH();
  inicializarADSL();
  inicializarWireless();
  inicializarCotesmaPlay();
  inicializarSIP();

  // Comerciales
  inicializarCambioDomicilio();
  inicializarCambioTecnologia();
  inicializarAltaServicio();
}

// ============================================
// FTTH
// ============================================

function inicializarFTTH() {
  const botonGenerar = document.getElementById("generarBtn_ftth");
  const botonCopiar = document.getElementById("copiarBtn_ftth");

  if (!botonGenerar) return;

  botonGenerar.addEventListener("click", () => {
    const direccionVerificada = document.getElementById("direccionCheck_ftth");
    if (!direccionVerificada.checked) {
      alert("Debes confirmar la dirección.");
      return;
    }

    const ubicacion = obtenerValor("ubicacion_ftth");
    const contacto = obtenerValor("contacto_ftth");
    const comentario = obtenerValor("comentario_ftth");
    const potencia = obtenerValor("potencia_ftth");
    const desconexiones = obtenerValor("desconexiones_ftth");

    const texto = `RECLAMO FTTH
Dirección: Verificada
${ubicacion ? `Ubicación: ${ubicacion}\n` : ""}Contacto: ${contacto}
Comentario: ${comentario}
Potencia ONT: ${potencia}
Desconexiones (7 días): ${desconexiones}`;

    document.getElementById("resultado_ftth").textContent = texto;
    toggleElemento("resultadoContainer_ftth", true);
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_ftth", botonCopiar);
    });
  }
}

// ============================================
// ADSL
// ============================================

function inicializarADSL() {
  const botonGenerar = document.getElementById("generarBtn_adsl");
  const botonCopiar = document.getElementById("copiarBtn_adsl");
  const selectModem = document.getElementById("modem_adsl");

  if (!botonGenerar) return;

  // Mostrar campo "otro módem"
  if (selectModem) {
    selectModem.addEventListener("change", () => {
      toggleElemento("otroModemContainer_adsl", selectModem.value === "otro");
    });
  }

  botonGenerar.addEventListener("click", () => {
    const direccionVerificada = document.getElementById("direccionCheck_adsl");
    if (!direccionVerificada.checked) {
      alert("Debes confirmar la dirección.");
      return;
    }

    const ubicacion = obtenerValor("ubicacion_adsl");
    const contacto = obtenerValor("contacto_adsl");
    const comentario = obtenerValor("comentario_adsl");
    
    let modem = obtenerValor("modem_adsl");
    if (modem === "otro") {
      modem = obtenerValor("otroModem_adsl");
    }

    const rateUp = obtenerValor("rate_up_adsl");
    const rateDown = obtenerValor("rate_down_adsl");
    const snrUp = obtenerValor("snr_up_adsl");
    const snrDown = obtenerValor("snr_down_adsl");
    const attUp = obtenerValor("att_up_adsl");
    const attDown = obtenerValor("att_down_adsl");
    const desconexiones = obtenerValor("desconexiones_adsl");

    const texto = `RECLAMO ADSL
Dirección: Verificada
${ubicacion ? `Ubicación: ${ubicacion}\n` : ""}Contacto: ${contacto}
Comentario: ${comentario}
Módem: ${modem}
Rate: ${rateUp}/${rateDown} Kbps
SNR: ${snrUp}/${snrDown} dBm
Atenuación: ${attUp}/${attDown} dBm
Desconexiones (7 días): ${desconexiones}`;

    document.getElementById("resultado_adsl").textContent = texto;
    toggleElemento("resultadoContainer_adsl", true);
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_adsl", botonCopiar);
    });
  }
}

// ============================================
// WIRELESS
// ============================================

function inicializarWireless() {
  const botonGenerar = document.getElementById("generarBtn_wireless");
  const botonCopiar = document.getElementById("copiarBtn_wireless");
  const tipoSenal = document.getElementById("tipo_senal_wireless");

  if (!botonGenerar) return;

  // Mostrar/ocultar bloques según tipo de señal
  if (tipoSenal) {
    tipoSenal.addEventListener("change", () => {
      toggleElemento("ccq_block_wireless", tipoSenal.value === "ccq");
      toggleElemento("cadenas_block_wireless", tipoSenal.value === "cadenas");
    });
  }

  botonGenerar.addEventListener("click", () => {
    const direccionVerificada = document.getElementById("direccionCheck_wireless");
    if (!direccionVerificada.checked) {
      alert("Debes confirmar la dirección.");
      return;
    }

    const ubicacion = obtenerValor("ubicacion_wireless");
    const contacto = obtenerValor("contacto_wireless");
    const comentario = obtenerValor("comentario_wireless");
    const accesoRouter = obtenerRadioSeleccionado("acceso_router_wireless");
    const accesoVoip = obtenerRadioSeleccionado("acceso_voip_wireless");
    const sipRegistro = obtenerRadioSeleccionado("sip_registro_wireless");
    const tipoSenalValor = obtenerValor("tipo_senal_wireless");
    const desconexiones = obtenerValor("desconexiones_wireless");

    let textoSenal = "";
    if (tipoSenalValor === "ccq") {
      const senal = obtenerValor("ccq_senal_wireless");
      const ccq = obtenerValor("ccq_valor_wireless");
      textoSenal = `Señal CCQ:
Señal: ${senal} dBm
CCQ: ${ccq}%`;
    } else if (tipoSenalValor === "cadenas") {
      const antena = obtenerValor("cadena_antena_wireless");
      const ap = obtenerValor("cadena_ap_wireless");
      textoSenal = `Señal Cadenas:
Antena: ${antena}
AP: ${ap}`;
    }

    const texto = `RECLAMO WIRELESS
Dirección: Verificada
${ubicacion ? `Ubicación: ${ubicacion}\n` : ""}Contacto: ${contacto}
Comentario: ${comentario}
Acceso Router: ${accesoRouter}
Acceso VoIP: ${accesoVoip}
SIP Registro: ${sipRegistro}
${textoSenal}
Desconexiones (7 días): ${desconexiones}`;

    document.getElementById("resultado_wireless").textContent = texto;
    toggleElemento("resultadoContainer_wireless", true);
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_wireless", botonCopiar);
    });
  }
}

// ============================================
// COTESMA PLAY
// ============================================

function inicializarCotesmaPlay() {
  const botonGenerar = document.getElementById("generarBtn_cplay");
  const botonCopiar = document.getElementById("copiarBtn_cplay");

  if (!botonGenerar) return;

  botonGenerar.addEventListener("click", () => {
    const direccionVerificada = document.getElementById("direccionCheck_cplay");
    if (!direccionVerificada.checked) {
      alert("Debes confirmar la dirección.");
      return;
    }

    const ubicacion = obtenerValor("ubicacion_cplay");
    const contacto = obtenerValor("contacto_cplay");
    const comentario = obtenerValor("comentario_cplay");
    const equiposSTB = obtenerValor("equipos_cplay");
    const versionApp = obtenerValor("version_app_cplay");
    const potenciaONT = obtenerValor("potencia_ont_cplay");
    const desconexiones = obtenerValor("desconexiones_cplay");

    const texto = `RECLAMO COTESMA PLAY
Dirección: Verificada
${ubicacion ? `Ubicación: ${ubicacion}\n` : ""}Contacto: ${contacto}
Comentario: ${comentario}
Equipos STB: ${equiposSTB}
Versión APP: ${versionApp}
Potencia ONT: ${potenciaONT}
Desconexiones (7 días): ${desconexiones}`;

    document.getElementById("resultado_cplay").textContent = texto;
    toggleElemento("resultadoContainer_cplay", true);
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_cplay", botonCopiar);
    });
  }
}

// ============================================
// SIP
// ============================================

function inicializarSIP() {
  const botonGenerar = document.getElementById("generarBtn_sip");
  const botonCopiar = document.getElementById("copiarBtn_sip");

  if (!botonGenerar) return;

  botonGenerar.addEventListener("click", () => {
    const direccionVerificada = document.getElementById("direccionCheck_sip");
    if (!direccionVerificada.checked) {
      alert("Debe verificar la dirección para generar el texto.");
      return;
    }

    const ubicacion = obtenerValor("ubicacion_sip", "No aplica");
    const contacto = obtenerValor("contacto_sip", "No indicado");
    const comentario = obtenerValor("comentario_sip", "Sin detalles");
    const registraEditor = obtenerRadioSeleccionado("editor_sip") || "No indicado";
    const registroOnt = obtenerRadioSeleccionado("registroOnt_sip") || "No indicado";
    const usuarioSip = obtenerValor("usuarioSip_sip", "No indicado");
    const potenciaOnt = obtenerValor("potenciaOnt_sip", "No indicado");
    const desconexiones = obtenerValor("desconexiones_sip", "No indicado");

    const texto = `Dirección verificada: SI
Ubicación/Coordenadas: ${ubicacion}
Contacto: ${contacto}
Comentario:
${comentario}
Registra Editor: ${registraEditor}
Registro ONT: ${registroOnt}
Usuario SIP: ${usuarioSip}
Potencia ONT: ${potenciaOnt}
Desconexiones en 7 días: ${desconexiones}`;

    document.getElementById("resultado_sip").textContent = texto;
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_sip", botonCopiar);
    });
  }
}

// ============================================
// CAMBIO DE DOMICILIO
// ============================================

function inicializarCambioDomicilio() {
  const botonGenerar = document.getElementById("generarBtn_cambio");
  const botonCopiar = document.getElementById("copiarBtn_cambio");
  const selectVelocidad = document.getElementById("velocidad_cambio");

  if (!botonGenerar) return;

  // Mostrar campo "otra velocidad"
  if (selectVelocidad) {
    selectVelocidad.addEventListener("change", () => {
      toggleElemento("velocidad_otro_container_cambio", selectVelocidad.value === "otro");
    });
  }

  botonGenerar.addEventListener("click", () => {
    const tipo = obtenerValor("tipoCambio_cambio");
    const contacto = obtenerValor("contacto_cambio", "No indicado");
    const ubicacion = obtenerValor("ubicacion_cambio", "No aplica");
    const chat = obtenerValor("chat_cambio", "No indicado");
    const direccionActual = obtenerValor("direccion_actual_cambio", "No indicado");
    const direccionNueva = obtenerValor("direccion_nueva_cambio", "No indicado");
    const catastro = obtenerValor("catastro_nuevo_cambio", "No indicado");
    
    let velocidad = obtenerValor("velocidad_cambio");
    if (velocidad === "otro") {
      velocidad = obtenerValor("velocidad_otro_cambio", "No indicado");
    }

    const texto = `Cambio de domicilio
Tipo: ${tipo}
Contacto: ${contacto}
Ubicación/Coordenadas: ${ubicacion}
Chat: ${chat}
Dirección actual: ${direccionActual}
Dirección nueva: ${direccionNueva}
Nuevo catastro: ${catastro}
Velocidad: ${velocidad}`;

    document.getElementById("resultado_cambio").textContent = texto;
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_cambio", botonCopiar);
    });
  }
}

// ============================================
// CAMBIO DE TECNOLOGÍA
// ============================================

function inicializarCambioTecnologia() {
  const botonGenerar = document.getElementById("generarBtn_cambioTec");
  const botonCopiar = document.getElementById("copiarBtn_cambioTec");
  const selectCosto = document.getElementById("costoInstalacion_cambioTec");
  const selectRedModificada = document.getElementById("modRedInterna_cambioTec");

  if (!botonGenerar) return;

  // Mostrar/ocultar campo de trámite
  if (selectCosto) {
    selectCosto.addEventListener("change", () => {
      const mostrar = selectCosto.value === "Bonificado Falla Técnica";
      toggleElemento("tramiteBox_cambioTec", mostrar);
      if (!mostrar) {
        const campoTramite = document.getElementById("tramiteFT_cambioTec");
        if (campoTramite) campoTramite.value = "";
      }
    });
  }

  // Mostrar advertencia de red modificada
  if (selectRedModificada) {
    selectRedModificada.addEventListener("change", () => {
      toggleElemento("warningRed_cambioTec", selectRedModificada.value === "Si");
    });
  }

  botonGenerar.addEventListener("click", () => {
    const planoAcometida = obtenerValor("planoAcometida_cambioTec");
    if (planoAcometida === "No") {
      alert("Debemos enviar el plano de acometida antes de continuar.");
      return;
    }

    const servicio = obtenerValor("servicioCambiar_cambioTec");
    const contacto = obtenerValor("contacto_cambioTec");
    const direccion = obtenerValor("direccion_cambioTec");
    const ubicacion = obtenerValor("ubicacion_cambioTec");
    const catastro = obtenerValor("catastro_cambioTec");
    const costoInstalacion = obtenerValor("costoInstalacion_cambioTec");
    const tramiteFT = obtenerValor("tramiteFT_cambioTec");
    const identificador = obtenerValor("identificador_cambioTec");
    const velocidad = obtenerValor("velocidad_cambioTec");
    const monitorea = obtenerValor("monitoreaCam_cambioTec");
    const redInterna = obtenerValor("redInterna_cambioTec");
    const llegada = obtenerValor("formaLlegada_cambioTec");
    const alarmaProv = obtenerValor("alarma_cambioTec");
    const redModificada = obtenerValor("modRedInterna_cambioTec");

    let texto = `*Cambio de Tecnología*
*Servicio a cambiar:* ${servicio}
*Contacto:* ${contacto}
*Dirección:* ${direccion}
*Ubicación/Coordenadas:* ${ubicacion}
*Catastro:* ${catastro}
*Costo de instalación:* ${costoInstalacion}`;

    if (costoInstalacion === "Bonificado Falla Técnica") {
      texto += `\n*N° Trámite:* ${tramiteFT}`;
    }

    texto += `
*Identificador:* ${identificador}
*Velocidad:* ${velocidad}
*Monitorea cámaras:* ${monitorea}
*Tiene red interna o repetidores:* ${redInterna}
*Servicio llega de forma:* ${llegada}
*En caso de alarma avisa al proveedor:* ${alarmaProv}
*Red interna modificada:* ${redModificada}
*Plano de acometida:* ${planoAcometida}`;

    document.getElementById("resultado_cambioTec").textContent = texto;
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_cambioTec", botonCopiar);
    });
  }
}

// ============================================
// ALTA DE SERVICIO
// ============================================

function inicializarAltaServicio() {
  const botonGenerar = document.getElementById("generarBtn_alta");
  const botonCopiar = document.getElementById("copiarBtn_alta");
  const selectServicio = document.getElementById("servicioAlta_alta");
  const selectRedModificada = document.getElementById("modRedInterna_alta");

  if (!botonGenerar) return;

  // Mostrar advertencia Zapala
  if (selectServicio) {
    selectServicio.addEventListener("change", () => {
      toggleElemento("warningZapala_alta", selectServicio.value === "Combo 200MB + C.Play");
    });
  }

  // Mostrar advertencia de red modificada
  if (selectRedModificada) {
    selectRedModificada.addEventListener("change", () => {
      toggleElemento("warningRed_alta", selectRedModificada.value === "Si");
    });
  }

  botonGenerar.addEventListener("click", () => {
    const planoAcometida = obtenerValor("planoAcometida_alta");
    if (planoAcometida === "No") {
      alert("Debemos enviar el plano de acometida antes de continuar.");
      return;
    }

    const servicio = obtenerValor("servicioAlta_alta");
    const cliente = obtenerValor("clienteDni_alta");
    const contacto = obtenerValor("contacto_alta");
    const direccion = obtenerValor("direccion_alta");
    const ubicacion = obtenerValor("ubicacion_alta");
    const catastro = obtenerValor("catastro_alta");
    const identificador = obtenerValor("identificador_alta");
    const velocidad = obtenerValor("velocidad_alta");
    const observacion = obtenerValor("observacion_alta");
    const monitorea = obtenerValor("monitoreaCam_alta");
    const redInterna = obtenerValor("redInterna_alta");
    const llegada = obtenerValor("formaLlegada_alta");
    const alarmaProv = obtenerValor("alarma_alta");
    const redModificada = obtenerValor("modRedInterna_alta");

    const texto = `*Alta de Servicio*
*Servicio solicitado:* ${servicio}
*Cliente/DNI:* ${cliente}
*Contacto:* ${contacto}
*Dirección:* ${direccion}
*Ubicación/Coordenadas:* ${ubicacion}
*Catastro:* ${catastro}
*Identificador:* ${identificador}
*Velocidad:* ${velocidad}
*Observación:* ${observacion}
*Monitorea cámaras:* ${monitorea}
*Tiene red interna o repetidores:* ${redInterna}
*Servicio llega de forma:* ${llegada}
*En caso de alarma avisa al proveedor:* ${alarmaProv}
*Red interna modificada:* ${redModificada}
*Plano de acometida:* ${planoAcometida}`;

    document.getElementById("resultado_alta").textContent = texto;
    botonCopiar.disabled = false;
  });

  if (botonCopiar) {
    botonCopiar.addEventListener("click", () => {
      copiarAlPortapapeles("resultado_alta", botonCopiar);
    });
  }
}