<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Models\Question;
use App\Models\Answer;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home()
    {
        // Charger toutes les questions avec leurs réponses associées et trier par nombre de réponses
        $questions = Question::with('answers')
            ->withCount('answers') // Ajouter un champ answers_count
            ->orderBy('answers_count', 'desc') // Trier par nombre de réponses
            ->get();

        return Inertia::render('Home', [
            'questions' => $questions,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function hub()
    {
        // Charger toutes les questions avec leurs réponses associées et trier par nombre de réponses
        $questions = Question::with('answers')
            ->withCount('answers')->with("user") // Ajouter un champ answers_count
            ->orderBy('answers_count', 'desc') // Trier par nombre de réponses
            ->get();

        return Inertia::render('Hub', [
            'questions' => $questions,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }




}
