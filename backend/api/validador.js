module.exports = app => {
    function existeOuErro(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === "string" && !value.trim()) throw msg
    }

    function naoExisteOuErro(value, msg) { /*  se existir me retorna erro */
        try {
            existeOuErro(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    function igualOuErro(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    function maiorOuErro(valor, tamanhoMin, msg) {
        if (valor.length < tamanhoMin) throw msg
    }
    function menorOuErro(valor, tamanhoMax, msg) {
        /* Se o valor for maior ou igual é retornado erro */
        if (valor.length > tamanhoMax) throw msg
    }

    function validarCPFOuErro(cpf, msg) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') throw msg;
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            throw msg;
        // Valida 1o digito	
        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            throw msg;
        // Valida 2o digito	
        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            throw msg;
    }
    function validarCNPJOuErro(cnpj, msg) {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') throw msg;

        if (cnpj.length != 14)
            throw msg;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            throw msg;

        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            throw msg;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            throw msg;
    }

    function FormateSoNumero(element) {
        return element.replace(/[^\d]+/g, '');
    }

    function validarTelefoneOuErro(telefone, msg) {
        //retira todos os caracteres menos os numeros
        telefone = telefone.replace(/\D/g, '');

        //verifica se tem a qtde de numero correto
        if (!(telefone.length >= 10 && telefone.length <= 11)) throw msg;

        //Se tiver 11 caracteres, verificar se começa com 9 o contato
        if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) throw msg;

        //verifica se não é nenhum numero digitado errado (propositalmente)
        for (var n = 0; n < 10; n++) {
            //um for de 0 a 9.
            //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o 	  
            //caractere a ser repetido
            if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) throw msg;;
        }
        //DDDs validos
        var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 24, 27, 28, 31, 32, 33, 34,
            35, 37, 38, 41, 42, 43, 44, 45, 46,
            47, 48, 49, 51, 53, 54, 55, 61, 62,
            64, 63, 65, 66, 67, 68, 69, 71, 73,
            74, 75, 77, 79, 81, 82, 83, 84, 85,
            86, 87, 88, 89, 91, 92, 93, 94, 95,
            96, 97, 98, 99];
        //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
        if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) throw msg;;

        //se passar por todas as validações acima, então está tudo certo
    }


    function qtdIgualOuErro(elemento, qtd, msg) {
        if (elemento.length > qtd || elemento.length < qtd) throw msg
    }

    function validarEmail(email, msg) {
        if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
            throw msg
        }
    }
    function dataAtualFormatadaBR() {
        var data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano = data.getFullYear(),
            hra = data.getHours().toString().padStart(2, '0'),
            mnt = data.getMinutes().toString().padStart(2, '0'),
            seg = data.getSeconds().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hra}:${mnt}:${seg}`
    }
    async function naoExisteNoBancoOuErro(nomeTabelaBD, nomeColunaBD, reqBody, msg) {
        const noBanco = await app.db(nomeTabelaBD)
            .where(`${nomeColunaBD}`, '=', `${reqBody}`).first()
        if (noBanco) throw msg
    }

    async function existeNoBancoOuErro(nomeTabelaBD, nomeColunaBD, reqBody, msg) {
        const noBanco = await app.db(nomeTabelaBD)
            .where(`${nomeColunaBD}`, '=', `${reqBody}`).first()
        if (!noBanco) throw msg
        return noBanco
    }



    return { dataAtualFormatadaBR, maiorOuErro, validarEmail, existeOuErro, naoExisteOuErro, igualOuErro, validarCPFOuErro, FormateSoNumero, validarTelefoneOuErro, qtdIgualOuErro, validarCNPJOuErro, existeNoBancoOuErro, naoExisteNoBancoOuErro, menorOuErro }
}