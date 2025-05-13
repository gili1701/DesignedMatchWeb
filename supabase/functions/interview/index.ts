import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import { Configuration, OpenAIApi } from 'npm:openai@3.3.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openai = new OpenAIApi(new Configuration({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
}));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, question, answer } = await req.json();

    // Get the current profile state
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Generate the next question based on the profile schema and previous answers
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional matchmaker conducting an interview to create a dating profile. 
          The profile schema includes: Personal Details, Family Background, Personality, and Partner Preferences.
          Current profile state: ${JSON.stringify(profile)}
          Previous question: ${question}
          User's answer: ${answer}
          
          Generate the next relevant question based on the schema and previous answers.
          Keep questions conversational and natural.
          Focus on one aspect at a time.
          Adapt follow-up questions based on previous answers.`
        }
      ],
      temperature: 0.7,
    });

    const nextQuestion = completion.data.choices[0].message?.content;

    // Update the profile with the new answer
    if (question && answer) {
      await supabase
        .from('profiles')
        .update({ [question]: answer })
        .eq('user_id', userId);
    }

    return new Response(
      JSON.stringify({ 
        nextQuestion,
        done: !nextQuestion 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});