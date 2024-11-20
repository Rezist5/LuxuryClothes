<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SetupTestData extends Command
{
    protected $signature = 'app:setup-test-data';
    protected $description = 'Setup test data for the application';

    public function handle()
    {
        $this->info('Starting database setup...');

        $this->call('migrate:fresh');
        $this->info('Database migrated.');

        $this->call('db:seed');
        $this->info('Database seeded.');

        $this->info('Creating storage link...');
        $this->call('storage:link');

        $this->info('Test data setup completed!');
        
        $this->info('Admin credentials:');
        $this->info('Email: admin@example.com');
        $this->info('Password: password');
        
        $this->info('Test user credentials:');
        $this->info('Email: test@example.com');
        $this->info('Password: password');
    }
} 