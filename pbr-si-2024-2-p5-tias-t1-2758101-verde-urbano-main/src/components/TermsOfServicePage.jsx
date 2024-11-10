// TermsOfServicePage.js
import React, { useEffect } from 'react';
import './TermsOfServicePage.css';

function TermsOfServicePage({ onNavigate }) {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll para o topo ao carregar
    }, []);

    return (
        <section className="terms-of-service-page fade-in">
            <h1>Termos de Serviço</h1>
            <p className="update-date">Última atualização: 1 de Novembro de 2024</p>

            <h2>1. Aceitação dos Termos</h2>
            <p>Ao utilizar nosso site e serviços, você concorda em cumprir com estes Termos de Serviço e com todas as leis e regulamentos aplicáveis. Se você não concorda com algum destes termos, está proibido de acessar ou utilizar este serviço.</p>

            <h2>2. Uso dos Serviços</h2>
            <p>Nossos serviços são disponibilizados exclusivamente para uso pessoal e não comercial. Ao utilizar nosso serviço, você concorda em não:</p>
            <ul>
                <li>Modificar, copiar, distribuir, transmitir, exibir, executar, reproduzir, publicar, licenciar, criar trabalhos derivados, transferir ou vender qualquer conteúdo, software, produto ou serviço obtido através do nosso site.</li>
                <li>Utilizar o serviço para qualquer propósito ilegal, abusivo, difamatório ou fraudulento.</li>
                <li>Interferir ou interromper os servidores ou redes conectadas ao serviço, incluindo a tentativa de burlar qualquer segurança implementada no site.</li>
            </ul>

            <h2>3. Direitos e Responsabilidades dos Usuários</h2>
            <p>O usuário concorda em fornecer informações precisas e atualizadas ao criar uma conta. Qualquer conteúdo enviado pelo usuário permanece sob sua responsabilidade, e a plataforma se reserva o direito de remover ou desativar qualquer conteúdo que considere inadequado ou em desacordo com os termos estabelecidos.</p>

            <h2>4. Propriedade Intelectual</h2>
            <p>Todos os conteúdos, como textos, gráficos, logotipos, ícones, imagens e software, são de propriedade exclusiva da nossa plataforma ou de seus fornecedores de conteúdo, sendo protegidos por leis de direitos autorais e marcas registradas. É proibido o uso de qualquer material sem a devida autorização.</p>

            <h2>5. Privacidade e Dados Pessoais</h2>
            <p>Para entender como coletamos e utilizamos seus dados pessoais, consulte nossa <button onClick={() => onNavigate('privacy-policy')} className="terms-link">Política de Privacidade</button>. Comprometemo-nos a manter a confidencialidade das suas informações, exceto nos casos previstos em lei.</p>

            <h2>6. Limitações de Responsabilidade</h2>
            <p>Nossa plataforma não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou da incapacidade de uso de nossos serviços. Isso inclui, mas não se limita a, perda de dados, perda de lucros, ou qualquer outro dano relacionado ao desempenho ou uso do site.</p>

            <h2>7. Modificações nos Termos</h2>
            <p>Reservamo-nos o direito de revisar e atualizar estes Termos de Serviço a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação no site. Recomendamos que você revise os termos regularmente para estar ciente de quaisquer modificações.</p>

            <h2>8. Suspensão e Encerramento de Contas</h2>
            <p>Podemos suspender ou encerrar sua conta caso identifiquemos violações destes Termos de Serviço. Em caso de encerramento, você perde imediatamente o direito de acesso ao serviço, e qualquer conteúdo armazenado em sua conta poderá ser deletado.</p>

            <h2>9. Links Externos</h2>
            <p>Nossa plataforma pode conter links para sites de terceiros. Não nos responsabilizamos pelo conteúdo, políticas de privacidade ou práticas desses sites. Recomendamos que você leia os termos e políticas de privacidade dos sites que visitar.</p>

            <h2>10. Disposições Gerais</h2>
            <p>Estes Termos de Serviço representam o acordo integral entre o usuário e nossa plataforma, substituindo quaisquer entendimentos ou acordos anteriores. Se qualquer disposição deste acordo for considerada inválida, as demais disposições continuarão em pleno vigor e efeito.</p>

            <h2>11. Contato</h2>
            <p>Se você tiver dúvidas sobre nossos Termos de Serviço, entre em contato conosco pelo email <a href="mailto:contato@verdeurbano.com">contato@verdeurbano.com</a>.</p>
        </section>
    );
}

export default TermsOfServicePage;
