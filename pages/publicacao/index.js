import { useState } from 'react';

import CabecalhoComAcoes from '../../componentes/cabecalhoComAcoes';
import comAutorizacao from '../../hoc/comAutorizacao';
import UploadImagem from '../../componentes/uploadImagem';
import Botao from '../../componentes/botao';
import imagemPublicacao from '../../public/images/imagemPublicacao.svg';
import imagemSetaEsquerda from '../../public/images/setaEsquerda.svg';


function Publicacao() {
    const [imagem, setImagem] = useState();
    const [descricao, setDescricao] = useState('');
    const [inputImagem, setInputImagem] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm() && imagem) {
            return 'Cancelar';
        }

        return '';
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }

        if (estaNaEtapaUm()) {
            return 'Avançar';
        }

        return 'Compartilhar';
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()) {
            inputImagem.value = null;
            setImagem(null);
            return;
        }

        setEtapaAtual(1);
    }

    const aoClicarAcaoDireitaCabecalho = () => {
        setEtapaAtual(2);
    }

    const escreverDescricao = (e) => {
        const valorAtual = e.target.value;
        if (valorAtual.length >= limiteDaDescricao) {
            return;
        }

        setDescricao(valorAtual);
    }

    const obterClassNameCabecalho = () => {
        if (estaNaEtapaUm()) {
            return 'primeraEtapa';
        }

        return 'segundaEtapa';
    }

    return (
        <div className='paginaPublicacao largura30pctDesktop'>
            <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                iconeEsquerda={estaNaEtapaUm() ? null : imagemSetaEsquerda}
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
                titulo='Nova Publicacao'
            />

            <hr className='linhaDivisoria' />

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                    ? (
                        <div className='primeiraEtapa'>
                            <UploadImagem
                                setImagem={setImagem}
                                aoSetarAReferencia={setInputImagem}
                                imagemPreviewClassName={!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'}
                                imagemPreview={imagem?.preview || imagemPublicacao.src}
                            />

                            <span className='desktop textoDragAndDrop'>Arraste sua foto aqui!</span>

                            <Botao
                                texto='Selecionar uma imagem'
                                manipularClique={() => inputImagem?.click()}
                            />
                        </div>

                    ) : (
                        <>
                            <div className='segundaEtapa'>
                                <UploadImagem
                                    setImagem={setImagem}
                                    imagemPreview={imagem?.preview}
                                />

                                <textarea
                                    rows={3}
                                    value={descricao}
                                    placeholder='Escreva uma legenda...'
                                    onChange={escreverDescricao}
                                ></textarea>

                            </div>
                            <hr className='linhaDivisoria' />
                        </>
                    )}
            </div>
        </div>
    );
}

export default comAutorizacao(Publicacao);