-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DutieDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DutieDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DutieDB` DEFAULT CHARACTER SET utf8 ;
USE `DutieDB` ;

-- -----------------------------------------------------
-- Table `DutieDB`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DutieDB`.`usuario` (
  `id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `nome_de_usuario` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_de_usuario_UNIQUE` (`nome_de_usuario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DutieDB`.`lista_tarefas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DutieDB`.`lista_tarefas` (
  `id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(260) NOT NULL,
  `data_criacao` VARCHAR(45) NOT NULL,
  `data_ultima_alteracao` VARCHAR(45) NOT NULL,
  `visibilidade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lista_tarefas_usuario_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_lista_tarefas_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `DutieDB`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DutieDB`.`tarefa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DutieDB`.`tarefa` (
  `codigo` INT NOT NULL,
  `lista_tarefas_id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(260) NOT NULL,
  `prioridade` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `fk_tarefa_lista_tarefas1_idx` (`lista_tarefas_id` ASC) VISIBLE,
  CONSTRAINT `fk_tarefa_lista_tarefas1`
    FOREIGN KEY (`lista_tarefas_id`)
    REFERENCES `DutieDB`.`lista_tarefas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
