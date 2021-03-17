# SVM

SVM de um conjunto de dados de câncer de mama que gera uma probabilidade e categoriza novos pacientes.

## Dados para o treinamento

O modelo foi construído com a utilização de um conjunto de dados de 699 pacientes com câncer de mama. O conjunto de dados passou por normalização e limpeza, o que resultou em 500 pacientes no conjunto de dados finais para treinamento e teste.

São 500 pacientes no total, sendo 262 (52,4%) com casos de tumores benignos e 238 (47,6%) com casos de tumores malignos. Para o treinamento foram utilizados 80% dos dados, sendo 40% de casos de tumores benignos e 40% de tumores malignos, e para o teste os 20% restantes. Destes 20%, 12,4% são de tumores benignos e 7,6% são de tumores malignos.

## Como executar

- Clone o repositório
- Inicie o seu servidor

Agora você pode acessar os resultados da predição do SVM.

## Observações

O arquivo `svm.js` no diretório `src` foi retirado do seguinte repositório, que permite o uso e modificações: <https://github.com/karpathy/svmjs>
