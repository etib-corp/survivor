<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240903145718 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE clothe (id INT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customer (id INT NOT NULL, email VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, birth_date DATE NOT NULL, gender VARCHAR(255) NOT NULL, description VARCHAR(1024) NOT NULL, astrological_sign VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE employee (id INT NOT NULL, email VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, birth_date DATE DEFAULT NULL, gender VARCHAR(255) NOT NULL, work VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE encounter (id INT NOT NULL, customer_id INT NOT NULL, date DATE NOT NULL, rating INT NOT NULL, comment VARCHAR(1024) NOT NULL, source VARCHAR(255) NOT NULL, INDEX IDX_69D229CA9395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event (id INT NOT NULL, employee_id INT NOT NULL, name VARCHAR(255) NOT NULL, date DATE NOT NULL, max_participants INT NOT NULL, location_x VARCHAR(255) NOT NULL, location_y VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, location_name VARCHAR(255) NOT NULL, INDEX IDX_3BAE0AA78C03F15C (employee_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payment (id INT NOT NULL, customer_id INT NOT NULL, date DATE NOT NULL, method VARCHAR(255) NOT NULL, comment VARCHAR(1024) NOT NULL, amount DOUBLE PRECISION NOT NULL, INDEX IDX_6D28840D9395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tip (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, tip VARCHAR(1024) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE encounter ADD CONSTRAINT FK_69D229CA9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA78C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE encounter DROP FOREIGN KEY FK_69D229CA9395C3F3');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA78C03F15C');
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840D9395C3F3');
        $this->addSql('DROP TABLE clothe');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE encounter');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE payment');
        $this->addSql('DROP TABLE tip');
    }
}
