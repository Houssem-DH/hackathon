<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\Queue;
use Illuminate\Support\Carbon;






use Illuminate\Http\Request;

class QueueController extends Controller
{
    public function queue_index()
{
    if (Auth::check()) {
        // Récupérer les rendez-vous disponibles (par exemple, les rendez-vous dans les 2 prochains jours)
        $availableQueues = Queue::where('appointment', '>=', Carbon::now())
            ->where('appointment', '<=', Carbon::now()->addDays(2))
            ->orderBy('appointment', 'asc')
            ->get();

        return Inertia::render('TicketRequest', [
            'availableQueues' => $availableQueues->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'service_type' => $queue->service_type,
                    'type_duration' => $queue->type_duration,
                    'appointment' => Carbon::parse($queue->appointment)->format('Y-m-d H:i'),
                ];
            }),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    } else {
        return Redirect::route('Home');
    }
}



    public function addToQueue(Request $request)
    {
        // Valider les données de la requête
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'required|digits_between:10,15',
            'service_type' => 'required|string|max:255',
            
            'postal_office' => 'required|string|max:255',
        ]);

        // Vérifier l'heure du dernier rendez-vous pour ce bureau postal
        $lastAppointment = Queue::where('postal_office', $validated['postal_office'])
            ->orderBy('appointment', 'desc')
            ->first();

        // Calculer l'heure du nouveau rendez-vous
        $newAppointmentTime = $lastAppointment
            ? Carbon::parse($lastAppointment->appointment)->addMinutes($lastAppointment->type_duration + 15) // 15 min d'intervalle
            : Carbon::now()->startOfDay()->addHours(8); // Par défaut 9h du matin

        // Ajouter le nouveau rendez-vous dans la file d'attente
        $queue = Queue::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone_number' => $validated['phone_number'],
            'service_type' => $validated['service_type'],
            
            'postal_office' => $validated['postal_office'],
            'appointment' => $newAppointmentTime,
        ]);

        // Rediriger vers une page spécifique avec un message de succès
        return redirect()->back()->with('success', 'Appointment Added .');
    }


    public function completeAppointment($queueId)
    {
        // Trouver le rendez-vous terminé
        $completedQueue = Queue::findOrFail($queueId);

        // Recalculer les rendez-vous suivants pour ce bureau postal
        $nextQueues = Queue::where('postal_office', $completedQueue->postal_office)
            ->where('appointment', '>', $completedQueue->appointment)
            ->orderBy('appointment', 'asc')
            ->get();

        $nextStartTime = Carbon::now()->addMinutes(15); // Ajuster à la fin du service

        foreach ($nextQueues as $queue) {
            $queue->update(['appointment' => $nextStartTime]);
            $nextStartTime = $nextStartTime->addMinutes($queue->type_duration + 15);
        }

        // Rediriger avec un message de succès
        return redirect()->route('queue.index')->with('success', 'Rendez-vous terminé et file d’attente mise à jour.');
    }



    public function getAppointments()
    {
        $queues = Queue::orderBy('appointment', 'asc')->get();
    
        return Inertia::render('Appointments/Index', [
            'queues' => $queues->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'service_type' => $queue->service_type,
                    'type_duration' => $queue->type_duration,
                    'appointment' => $queue->appointment->format('Y-m-d H:i'), // Format pour affichage
                ];
            }),
        ]);
    }
    




}
