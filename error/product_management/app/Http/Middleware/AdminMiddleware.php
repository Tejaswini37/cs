<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // $request->user()
// Returns the currently authenticated user
// Auth::id() returns the ID of the currently authenticated user.
// check authentication, user roles, or modify requests before they reach controllers.
    public function handle(Request $request, Closure $next): Response
    {

        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        return response()->json([
            'message' => 'Access denied. Admins only.'
        ], 403);
    }
}
