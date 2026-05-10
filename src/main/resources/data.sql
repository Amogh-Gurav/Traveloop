-- ============================================================
-- Traveloop Seed Data
-- Runs automatically on Spring Boot startup (spring.jpa.defer-datasource-initialization=true)
-- ============================================================

-- ── 1. Default User (id = 1) ────────────────────────────────
INSERT INTO users (id, username, email, password_hash, full_name, created_at, updated_at)
VALUES (1, 'traveler', 'traveler@traveloop.app', '5e884898', 'Demo Traveler', NOW(), NOW())
ON DUPLICATE KEY UPDATE username = username;

-- ── 2. Sample Trip (linked to user_id = 1) ─────────────────
INSERT INTO trips (id, user_id, title, description, start_date, end_date, total_budget, currency, is_public, share_token, created_at, updated_at)
VALUES (1, 1, 'Lucknow Heritage Tour', 'Exploring the Nawabi city — kebabs, Imambaras, and Chikankari!', '2026-06-01', '2026-06-05', 35000.00, 'INR', true, 'demo1234abcd5678', NOW(), NOW())
ON DUPLICATE KEY UPDATE title = title;

-- ── 3. Sample Stops ─────────────────────────────────────────
INSERT INTO stops (id, trip_id, city_name, country, arrival_date, departure_date, stop_order, accommodation_name, accommodation_cost, transport_cost, notes, created_at, updated_at)
VALUES (1, 1, 'Lucknow', 'India', '2026-06-01', '2026-06-03', 1, 'Taj Mahal Hotel', 4500.00, 2500.00, 'Main heritage stop', NOW(), NOW())
ON DUPLICATE KEY UPDATE city_name = city_name;

INSERT INTO stops (id, trip_id, city_name, country, arrival_date, departure_date, stop_order, accommodation_name, accommodation_cost, transport_cost, notes, created_at, updated_at)
VALUES (2, 1, 'Agra', 'India', '2026-06-03', '2026-06-05', 2, 'Hotel Oberoi Amarvilas', 8000.00, 1200.00, 'Taj Mahal visit', NOW(), NOW())
ON DUPLICATE KEY UPDATE city_name = city_name;

-- ── 4. Sample Activities ────────────────────────────────────
INSERT INTO activities (id, stop_id, name, description, activity_date, start_time, end_time, cost, category, created_at, updated_at)
VALUES (1, 1, 'Bara Imambara Tour', 'Explore the famous labyrinth and Bhool Bhulaiya maze', '2026-06-01', '10:00:00', '13:00:00', 300.00, 'Sightseeing', NOW(), NOW())
ON DUPLICATE KEY UPDATE name = name;

INSERT INTO activities (id, stop_id, name, description, activity_date, start_time, end_time, cost, category, created_at, updated_at)
VALUES (2, 1, 'Tunday Kababi Dinner', 'Legendary Lucknow kebabs since 1905', '2026-06-01', '19:00:00', '21:00:00', 800.00, 'Food', NOW(), NOW())
ON DUPLICATE KEY UPDATE name = name;

INSERT INTO activities (id, stop_id, name, description, activity_date, start_time, end_time, cost, category, created_at, updated_at)
VALUES (3, 2, 'Taj Mahal Sunrise Visit', 'Early morning visit to the iconic monument', '2026-06-03', '05:30:00', '08:00:00', 1100.00, 'Sightseeing', NOW(), NOW())
ON DUPLICATE KEY UPDATE name = name;

-- ── 5. Sample Checklist Items ───────────────────────────────
INSERT INTO checklist_items (id, trip_id, item_name, category, is_packed, quantity, notes, created_at, updated_at)
VALUES (1, 1, 'Passport & ID', 'Documents', false, 1, 'Keep in carry-on', NOW(), NOW())
ON DUPLICATE KEY UPDATE item_name = item_name;

INSERT INTO checklist_items (id, trip_id, item_name, category, is_packed, quantity, notes, created_at, updated_at)
VALUES (2, 1, 'Phone Charger', 'Electronics', false, 1, NULL, NOW(), NOW())
ON DUPLICATE KEY UPDATE item_name = item_name;

INSERT INTO checklist_items (id, trip_id, item_name, category, is_packed, quantity, notes, created_at, updated_at)
VALUES (3, 1, 'Comfortable Walking Shoes', 'Clothing', false, 1, 'For Imambara and Taj visits', NOW(), NOW())
ON DUPLICATE KEY UPDATE item_name = item_name;
