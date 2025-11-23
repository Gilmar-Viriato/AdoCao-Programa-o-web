CREATE DATABASE encontrapet;
USE encontrapet;

CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) 

CREATE TABLE `publicacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagem_url` varchar(255) NOT NULL,
  `imagem_legenda` varchar(255) DEFAULT NULL,
  `tipo` enum('perdido','encontrado','adocao') NOT NULL,
  `nome_pet` varchar(100) DEFAULT NULL,
  `especie` enum('cachorro','gato','outro') NOT NULL,
  `raca` varchar(100) DEFAULT NULL,
  `cor` varchar(50) DEFAULT NULL,
  `genero` enum('macho','femea','nao_informado') DEFAULT 'nao_informado',
  `descricao` text,
  `telefone` varchar(20) DEFAULT NULL,
  `localizacao` varchar(255) DEFAULT NULL,
  `data_publicacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('ativo','resolvido','inativo') DEFAULT 'ativo',
  `usuario_id` int NOT NULL,
  CONSTRAINT `publicacao_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
)