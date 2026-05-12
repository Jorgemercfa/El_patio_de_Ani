<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
<header>
    <Navbar />
</header>

<div class="privacy-policy">
    <h1 class="title-privacy">Política de Privacidad</h1>
    <div class="privacy-content">
    <p>1. Todas las instalaciones, armado y desarmado de los juegos serán realizadas única y exclusivamente por personal enviado por LA EMPRESA. No está permitido cambiarlos de lugar sin la intervención del instalador.</p>
    <p>2. No se instalarán juegos en la vía pública.</p>
    <p>3. Los juegos serán colocados únicamente en terrenos planos, limpios y apropiados para su uso a criterio del instalador.</p>
    <p>4. LA EMPRESA se reserva el derecho de no instalar los juegos si considera que la superficie y/o el área destinada para su instalación ponen en riesgo su integridad, buen funcionamiento y/o durabilidad. En dicho caso se aplicará una penalidad del 50% del precio total del alquiler por los gastos ocasionados a LA EMPRESA y la imposibilidad de poder haber comprometido y prestado los servicios a otro cliente. Lo mismo aplicará en caso de cancelación por parte del Cliente posterior a la fecha del depósito.</p>
    <p>5. Los juegos se instalarán horas antes de la hora de inicio y se retirarán finalizando el evento. Esto se coordinará previamente. En ningún caso, los juegos permanecerán instalados por más de 6 horas.</p>
    <p>6. El precio se fija en Nuevos Soles que deberán ser abonados de la siguiente manera: 50% de adelanto para separar los juegos solicitados. Dicho importe deberá ser depositado o transferido a una de nuestras cuentas bancarias. El 50% restante será pagado en efectivo en el momento en que los juegos queden totalmente instalados. Cuentas disponibles: Interbank Cuenta simple soles: 2413258170620 / CCI: 00324101325817062078</p>
    <p>7. El alquiler de los juegos es por el horario y la fecha especificados en el presente contrato.</p>
    <p>8. Se deja expresa constancia que LA EMPRESA entregará los juegos en perfecto estado de conservación y limpieza, por lo que al momento de retirarlos, éstos deberán encontrarse en las mismas condiciones entregadas.</p>
    <p>9. No deberá excederse el límite de edad y/o peso de las personas que hagan uso de los juegos que están especificados en el presupuesto entregado, así como la cantidad de personas que simultáneamente hagan uso de los mismos.</p>
    <p>10. No se deberá de hacer uso de los juegos con ningún tipo de calzado, juguete, alimento, bebida, anteojos, lentes, animal, espuma, líquido, serpentina, instrumento punzocortante y cualquier otro objeto que ponga en riesgo la integridad física de las personas y el buen funcionamiento y/o durabilidad de los juegos y sus accesorios. Así mismo, no se debe fumar en los juegos ni en las inmediaciones de los mismos.</p>
    <p>11. Todo daño causado a los juegos y/o a sus accesorios y componentes o la falta de algún material de los mismos que se haya entregado conforme al presente contrato será pagado en su totalidad por el cliente.</p>
    <p>12. El Cliente declara haber sido debidamente informado respecto del uso de los juegos y sus restricciones, manifestando haber comprendido en su integridad cada uno de los términos señalados en el presente contrato y estar conforme con los mismos.</p>
    <p>13. LA EMPRESA NO se responsabiliza por eventuales daños o lesiones directos o indirectos que se puedan ocasionar a las personas por el mal uso, falta de precaución, falta de supervisión de los padres o familiares a los niños y/o no acatar las restricciones de los juegos y/o sus accesorios mencionadas en el presente contrato y enviadas en su presupuesto. En consecuencia, el cliente responde por cualquier tipo de perjuicio económico o de otra naturaleza que de tales daños deriven liberando de toda responsabilidad a LA EMPRESA.</p>
    <p>14. LA EMPRESA declara recibir en este acto el 50% del total de los juegos en alquiler como adelanto y reservación de los mismos.</p>
    <p>15. El transporte no está incluido en los precios de alquiler y variará según la lejanía del distrito (costo mínimo de 80 soles por concepto de transporte y carga).</p>
    </div>

    <div class="extra-content">
    <p>POLÍTICA DE PRIVACIDAD: La información que nos proporcione es almacenada en una base de datos altamente segura, y en ningún momento daremos sus datos para mercadotecnia de otras empresas o cualquier otro fin.</p>
    <p>El cliente es responsable de verificar que la instalación eléctrica de la propiedad pueda soportar la carga de los inflables, según las especificaciones proporcionadas. Si no se cumple con estos requisitos o el inflable no cabe en el espacio designado, se cobrará el 50% del monto total como penalización, ya que esto impide la realización de otro contrato en esa fecha.</p>
    </div>

    

</div>
<footer>
    <Footer />
</footer>
</template>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.title-privacy {
  font-size: clamp(1.8rem, 2vw + 1rem, 2.5rem);
  margin-bottom: 32px;
  font-weight: 800;
  text-align: left;
  position: relative;
  background: linear-gradient(135deg, #E91E81, #2D3E94);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-privacy::after {
  content: '';
  width: 64px;
  height: 4px;
  background-color: #E91E81;
  position: absolute;
  bottom: -10px;
  left: 0;
  border-radius: 5px;
}

.privacy-content {
  margin-top: 24px;
}

.privacy-content p {
  margin-bottom: 16px;
  line-height: 1.6;
  color: #2D3E94;
}

.extra-content {
  margin-top: 32px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
.extra-content p {
  margin: 0;
  line-height: 1.6;
  color: #2D3E94;
}

</style>