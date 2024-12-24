import { Resend } from 'resend';
import * as usuarioController from "./usuariosController"
import * as petController from "./petController"

const resend = new Resend('re_bNHAYx59_HGL8XGnJ7PqbFnuD1L68BagC');


async function sendMail(from: number, to: number, petId: number , message: string){
    const userFrom = await usuarioController.getUsuarioById(from);
    const userTo = await usuarioController.getUsuarioById(to);
    const petFound = await petController.getPets("id", petId); 

    const mailSent = await resend.emails.send({
      from: 'Pet Finder App <alerts@resend.dev>',
      to: [`${userTo.email}`],
      subject: 'Tenés una alerta sobre tu mascota',
      html: `
        <h2> Tenés una alerta sobre tu mascota </h2>
        <p>${userFrom.nombre} reportó haber visto a ${petFound.nombre}</p>
        <p>Mensaje: ${message}</p>
      `,
    });



    return mailSent
}

export { sendMail }