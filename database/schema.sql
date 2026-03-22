-- ============================================
-- Happy Dog App - Database Schema
-- ============================================
-- MariaDB/MySQL Schema for Happy Dog Virtual Pet App

-- Create database (if not exists)
-- CREATE DATABASE IF NOT EXISTS happy_dog;
-- USE happy_dog;

-- ============================================
-- 1. CHILDREN (Spieler/Profile)
-- ============================================
CREATE TABLE IF NOT EXISTS children (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  pin VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
);

-- ============================================
-- 2. DOGS (Virtuelle Hunde)
-- ============================================
CREATE TABLE IF NOT EXISTS dogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_id INT NOT NULL,
  dog_name VARCHAR(255) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  level INT DEFAULT 1,
  hunger INT DEFAULT 50,
  happiness INT DEFAULT 50,
  health INT DEFAULT 100,
  visual_state VARCHAR(50) DEFAULT 'baby',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  INDEX idx_child_id (child_id)
);

-- ============================================
-- 3. BONES (Währung)
-- ============================================
CREATE TABLE IF NOT EXISTS bones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_id INT NOT NULL UNIQUE,
  amount INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
);

-- ============================================
-- 4. TASKS (Aufgaben)
-- ============================================
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dog_id INT NOT NULL,
  task_type ENUM('walk', 'feed', 'pet', 'play') NOT NULL,
  bone_reward INT NOT NULL,
  cooldown_hours INT DEFAULT 24,
  last_completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE,
  INDEX idx_dog_id (dog_id)
);

-- ============================================
-- 5. SHOP ITEMS (Dinge zum Kaufen)
-- ============================================
CREATE TABLE IF NOT EXISTS shop_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('toy', 'collar', 'leash', 'bed', 'treat', 'other') NOT NULL,
  cost INT NOT NULL,
  image_url VARCHAR(500),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type)
);

-- ============================================
-- 6. INVENTORY (Was Kinder gekauft haben)
-- ============================================
CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_id INT NOT NULL,
  shop_item_id INT NOT NULL,
  quantity INT DEFAULT 1,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (shop_item_id) REFERENCES shop_items(id) ON DELETE CASCADE,
  INDEX idx_child_id (child_id),
  INDEX idx_shop_item_id (shop_item_id)
);

-- ============================================
-- 7. BADGES (Achievements)
-- ============================================
CREATE TABLE IF NOT EXISTS badges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  condition_type VARCHAR(100),
  condition_value INT,
  reward_bones INT DEFAULT 50,
  icon_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_name (name)
);

-- ============================================
-- 8. CHILD BADGES (Badge Progress pro Kind)
-- ============================================
CREATE TABLE IF NOT EXISTS child_badges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_id INT NOT NULL,
  badge_id INT NOT NULL,
  is_unlocked BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
  UNIQUE KEY unique_child_badge (child_id, badge_id)
);

-- ============================================
-- 9. DAILY EVENTS (Saisonale Events)
-- ============================================
CREATE TABLE IF NOT EXISTS daily_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  description TEXT,
  reward_bones INT DEFAULT 0,
  event_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_date (event_date)
);

-- ============================================
-- 10. ACTIVITY LOG (Für Statistiken)
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_id INT,
  dog_id INT,
  activity_type VARCHAR(100),
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE,
  INDEX idx_child_id (child_id),
  INDEX idx_created_at (created_at)
);

-- ============================================
-- INITIAL DATA (Optional)
-- ============================================

-- Default Shop Items
INSERT INTO shop_items (name, type, cost, description, is_active) VALUES
('Tennisball', 'toy', 50, 'Ein bunter Tennisball zum Spielen', TRUE),
('Kaustock', 'toy', 75, 'Kauspielzeug aus Gummi', TRUE),
('Frisbee', 'toy', 60, 'Kunststoff-Frisbee für Hunde', TRUE),
('Rotes Halstuch', 'collar', 100, 'Buntes Halstuch für deinen Hund', TRUE),
('Blaue Leine', 'leash', 150, 'Sichere Leine für Spaziergänge', TRUE),
('Weiches Hundebett', 'bed', 300, 'Gemütliches Bett zum Ausruhen', TRUE),
('Hundeleckerlies', 'treat', 40, 'Leckere Hundekekse', TRUE);

-- Default Badges
INSERT INTO badges (name, description, condition_type, condition_value, reward_bones, icon_url) VALUES
('Hundeflüsterer', 'Gassi gehen 5x absolviert', 'walk_count', 5, 50, '/images/badges/dog-walker.png'),
('Gütiger Fütter', '50 Knochen verdient', 'total_bones', 50, 75, '/images/badges/feeder.png'),
('Spielbegeistert', '3 Mini-Games abgeschlossen', 'games_completed', 3, 60, '/images/badges/gamer.png'),
('Shopper', '3 Items im Shop gekauft', 'items_bought', 3, 100, '/images/badges/shopper.png'),
('7-Tage-Strähne', '7 Tage hintereinander mindestens 1 Aufgabe', 'daily_streak', 7, 200, '/images/badges/streak.png');

-- ============================================
-- PERMISSIONS & CLEANUP
-- ============================================

-- Show all tables created
-- SHOW TABLES;
