 function tornarTabelaEditavel(tabela)
            {
                // Obtém todas as tds da tabela fornecida.
                var tdlist = tabela.getElementsByTagName("td");

                for(var i = 0; tdlist[i]; i++) {
                    // Adiciona o evento double click em cada td da tabela.
                    tdlist[i].ondblclick = function() {
                        // Se for texto, muda para input.
                        if(this.firstChild.nodeType == 3) {
                            // Cria um campo de texto editável e insere o valor da td nesse campo.
                            var campo = document.createElement("input");
                            campo.value = this.firstChild.nodeValue;

                            // Substitui o texto da td pelo campo.
                            this.replaceChild(campo, this.firstChild);

                            campo.select();

                            // Faz o processo inverso ao perder o foco.
                            campo.onblur = function() {
                                this.parentNode.replaceChild(document.createTextNode(this.value), this);
                            }
                        }
                    }
                }
            }

            window.onload = function() {
                tornarTabelaEditavel(document.getElementById('idtabela'));
            }