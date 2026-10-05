# Smart Medicine Dispenser Dashboard

A professional, healthcare-focused IoT dashboard for an automated medicine dispenser. This frontend application is built with React, Vite, and Tailwind CSS, and connects to a Supabase backend to manage medication schedules and device status.

## Features

- **Next Medication Card**: Dynamic countdown to the upcoming dispensing event.
- **Today's Schedule**: Complete view of all daily medications with editing, toggling, and deletion features.
- **Position Visualizer**: Clean mapping of medication to the physical servo positions (A, B, C).
- **Device Status Monitoring**: Check real-time connectivity status of Wi-Fi, RTC, Servo Motor, Display, and Buzzer (mocked for development).
- **Dispensing History**: Log of past activity, successful dispenses, and missed ones.

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Backend/Database:** Supabase

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup

You need to create a Supabase project and set up the following database tables.

#### `medicine_schedule` Table
| Column | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | uuid | gen_random_uuid() | Yes | Primary Key |
| `medicine_name` | text | - | Yes | Name of the medicine |
| `dispense_time` | time | - | Yes | Scheduled dispensing time (HH:mm:ss) |
| `position` | text | - | Yes | Position 'A', 'B', or 'C' |
| `enabled` | boolean | true | Yes | Is schedule active? |
| `created_at` | timestampz | now() | Yes | Creation timestamp |
| `updated_at` | timestampz | now() | Yes | Update timestamp |

#### `dispensing_history` Table
| Column | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | uuid | gen_random_uuid() | Yes | Primary Key |
| `medicine_id` | uuid | - | Yes | Reference to medicine_schedule |
| `medicine_name` | text | - | Yes | Name (snapshot) |
| `dispensed_at` | time | - | Yes | Time it was dispensed |
| `position` | text | - | Yes | Position 'A', 'B', or 'C' |
| `status` | text | - | Yes | 'dispensed', 'failed', 'missed' |
| `created_at` | timestampz | now() | Yes | Creation timestamp |

#### `device_status` Table
| Column | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | uuid | gen_random_uuid() | Yes | Primary Key |
| `device_name` | text | - | Yes | Name of the device |
| `wifi_status` | text | - | Yes | 'Connected', 'Disconnected' |
| `rtc_status` | text | - | Yes | 'Synchronized', 'Error' |
| `servo_status` | text | - | Yes | 'Ready', 'Moving', 'Error' |
| `display_status` | text | - | Yes | 'Ready', 'Error' |
| `buzzer_status` | text | - | Yes | 'Ready', 'Error' |
| `last_seen` | timestampz | now() | Yes | Last time ESP32 pinged |
| `updated_at` | timestampz | now() | Yes | Update timestamp |

*(Ensure you configure adequate Row Level Security (RLS) policies for your environment)*

### 3. Environment Variables

Create a `.env` file in the root directory (you can copy from `.env.example`):

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

## Architecture

This frontend is phase 1 of the project.
Future phases involve connecting the ESP32 to Supabase.

1. **Dashboard** → Sets schedules in Supabase
2. **Supabase** → Central Truth / Database
3. **ESP32** → Pulls schedules from Supabase, compares with RTC time, moves servo motor to predefined positions (A, B, C) based on schedule.

*Note: The frontend does NOT interact with servo angles. The ESP32 maps position A/B/C to actual angles.*
