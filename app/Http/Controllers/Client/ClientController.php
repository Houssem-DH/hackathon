<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;



class ClientController extends Controller
{
    public function question_insert(Request $request)
    {



        if (Auth::check()) {


            // Validate the request data
            $data = $request->validate([
                'question_title' => ['required', 'string', 'max:255'],
                'question' => ['required', 'string'],
                'picture' => ['image', 'nullable'],
            ]);


            $question = new Question;




            if ($request->hasFile('picture')) {

                $picture = $request->file('picture')->store("question/{$question->id}", 'public');
                $question->picture = $picture;
            }
            $question->user_id = Auth::user()->id;
            $question->question_title = $data['question_title'];
            $question->question = $data['question'];
            $question->save();
            return Redirect::route('questions')->with('message', 'Question Added Succesfully');

        } else {
            return Redirect::route('Home');
        }

    }

    public function update_question(Request $request, $id)
    {

        if (Auth::check()) {

            $question = Question::find($id);

            if (Auth::user()->id == $question->user_id) {




                // Validate the request data
                $data = $request->validate([
                    'question_title' => ['required', 'string', 'max:255'],
                    'question' => ['required', 'string'],
                    'picture' => ['image', 'nullable'],
                ]);


                if ($request->hasFile('picture')) {

                    // Get the full path to the avatar file
                    $picture = $question->picture;

                    // Check if the file exists in storage before attempting to delete it
                    if ($picture) {
                        // Delete the avatar file
                        Storage::disk('public')->delete($picture);
                    }


                    // Store the uploaded avatar file in the storage disk

                    $picture = $request->file('picture')->store("question/{$id}", 'public');

                    // Update the user's avatar field with the path
                    $question->picture = $picture;
                }


                $question->question_title = $data['question_title'];
                $question->question = $data['question'];
                $question->update();

                return Redirect::route('/')->with('message', 'Question Updated Succesfully');

            } else {
                return Redirect::route('home')->with('message', 'Access Denied.');
            }

        } else {
            return Redirect::route('Home');
        }

    }

    public function sup_question($id)
    {
        if (Auth::check()) {

            $question = Question::find($id);

            if (Auth::user()->id == $question->user_id) {

                if ($question->picture) {

                    // Get the full path to the avatar file
                    $picture = $question->picture;

                    // Check if the file exists in storage before attempting to delete it
                    if ($picture) {
                        // Delete the avatar file
                        Storage::disk('public')->delete($picture);
                    }
                }

                $answers = Answer::where('question_id', $question->id)->delete();

                $question->delete();

                return Redirect::route('/')->with('message', 'Question Deleted Succesfully');

            } else {
                return Redirect::route('Home')->with('message', 'Access Denied');
            }

        } else {
            return Redirect::route('Home');
        }

    }


    public function answer_insert(Request $request, $id)
    {


        if (Auth::check()) {


            // Validate the request data
            $data = $request->validate([
                'answer' => ['required', 'string'],
                'picture' => ['image', 'nullable'],
            ]);


            $answer = new Answer;




            if ($request->hasFile('picture')) {

                $picture = $request->file('picture')->store("answer/{$answer->id}", 'public');
                $answer->picture = $picture;
            }

            $answer->user_id = Auth::user()->id;
            $answer->question_id = $id;
            $answer->answer = $data['answer'];

            $answer->save();
            return Redirect::route('/')->with('message', 'Answer Added Succesfully');

        } else {
            return Redirect::route('Home');
        }

    }


    public function update_answer(Request $request, $id)
    {

        if (Auth::check()) {

            $answer = Answer::find($id);

            if (Auth::user()->id == $answer->user_id) {




                // Validate the request data
                $data = $request->validate([
                    'answer' => ['required', 'string'],
                    'picture' => ['image', 'nullable'],
                ]);


                if ($request->hasFile('picture')) {

                    // Get the full path to the avatar file
                    $picture = $answer->picture;

                    // Check if the file exists in storage before attempting to delete it
                    if ($picture) {
                        // Delete the avatar file
                        Storage::disk('public')->delete($picture);
                    }


                    // Store the uploaded avatar file in the storage disk

                    $picture = $request->file('picture')->store("answer/{$id}", 'public');

                    // Update the user's avatar field with the path
                    $answer->picture = $picture;
                }


                $answer->answer = $data['answer'];
                $answer->update();


                return Redirect::route('/')->with('message', 'Answer Updated Succesfully');

            } else {
                return Redirect::route('home')->with('message', 'Access Denied.');
            }

        } else {
            return Redirect::route('Home');
        }

    }


    public function question_index()
    {



                return Inertia::render('Questions', [


            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);





    }


    public function sup_answer($id)
    {
        if (Auth::check()) {

            $answer = Answer::find($id);

            if (Auth::user()->id == $answer->user_id) {

                if ($answer->picture) {

                    // Get the full path to the avatar file
                    $picture = $answer->picture;

                    // Check if the file exists in storage before attempting to delete it
                    if ($picture) {
                        // Delete the avatar file
                        Storage::disk('public')->delete($picture);
                    }
                }

                $answer->delete();

                return Redirect::route('/')->with('message', 'Answer Deleted Succesfully');

            } else {
                return Redirect::route('Home')->with('message', 'Access Denied');
            }

        } else {
            return Redirect::route('Home');
        }

    }


    public function questions_user_index()
    {

        if (Auth::check()) {

            $questions = Question::where('user_id', Auth::user()->id)->get();



            return Inertia::render('MyQuestions', [

                'questions' => $questions,

                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
            ]);


        } else {
            return Redirect::route('Home');
        }


    }


    public function question_index_page($id)
    {

        if (Auth::check()) {

            $question = Question::with('user')->where('id', $id)->first();
            $answers = Answer::with('user')->where('question_id', $question->id)->get();



            return Inertia::render('QAPage', [

                'question' => $question,
                'answers' => $answers,

                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
            ]);


        } else {
            return Redirect::route('Home');
        }


    }
}
