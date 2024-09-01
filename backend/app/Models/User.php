<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,HasRoles;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $user->password = bcrypt($user->password);
        });

        static::updating(function ($user) {
            $user->password = bcrypt($user->password);
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        "code",
        'password',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * |"g>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'roles'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    // append the role to the user object
    protected $appends = ['role_name'];

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function getRoleNameAttribute()
    {
        return $this->roles->first()->name;
    }
}
