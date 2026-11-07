
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../data/demoCase';
import { extractComplaint, type IntakeResponse } from '../services/api';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ShieldAlert,
  FileSpreadsheet,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface IntakeScreenProps {
  onNotify: (
    type: 'success' | 'info' | 'warning',
    title: string,
    msg?: string
  ) => void;
  onProceedToSummary: () => void;
  onCaseExtracted: (data: IntakeResponse) => void;
}

export const IntakeScreen: React.FC<IntakeScreenProps> = ({
  onNotify,
  onProceedToSummary,
  onCaseExtracted
}) => {  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      content:
        'Welcome to Nyaya AI. Describe your consumer dispute in detail. Include the product, seller, purchase date, amount paid, problem faced and resolution you want. I will organize the facts and identify missing information.'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [caseData, setCaseData] = useState<IntakeResponse | null>(null);
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (event?: React.FormEvent) => {
    event?.preventDefault();

    const complaint = inputValue.trim();

    if (complaint.length < 20) {
      setError('Please describe your complaint in at least 20 characters.');
      return;
    }

    if (isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      content: complaint
    };

    setMessages(previous => [...previous, userMessage]);
    setInputValue('');
    setError('');
    setIsTyping(true);

    try {
      const result = await extractComplaint(complaint);
      setCaseData(result);
onCaseExtracted(result);
      const extractedFacts = [
        { label: 'Complaint Type', value: result.complaint_type },
        { label: 'Product / Service', value: result.product_or_service },
        { label: 'Seller / Platform', value: result.seller_or_platform },
        { label: 'Amount Paid', value: result.amount_paid },
        { label: 'Order Date', value: result.order_date },
        { label: 'Delivery Date', value: result.delivery_date },
        { label: 'Issue Date', value: result.issue_date },
        { label: 'Payment Method', value: result.payment_method },
        { label: 'Requested Resolution', value: result.resolution_requested }
      ]
        .filter(fact => Boolean(fact.value))
        .map(fact => ({
          label: fact.label,
          value: fact.value as string
        }));

      const missingInfo = result.missing_information.length
        ? '\n\nInformation still needed:\n' +
          result.missing_information.map(item => `â€¢ ${item}`).join('\n')
        : '\n\nNo additional information was flagged by the intake extractor.';

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        content:
          `${result.summary}${missingInfo}\n\n${result.disclaimer}\nProcessing: ${
            result.processing_mode === 'gemini'
              ? 'Gemini AI'
              : 'Local rule-based fallback'
          }.`,
        extractedFacts
      };

      setMessages(previous => [...previous, assistantMessage]);

      onNotify(
        'success',
        'Complaint analyzed',
        'Your complaint has been converted into a structured case brief.'
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.';

      setError(message);

      setMessages(previous => [
        ...previous,
        {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          content:
            'I could not process this complaint. Please check the backend connection and try again.'
        }
      ]);

      onNotify('warning', 'Analysis failed', message);
    } finally {
      setIsTyping(false);
    }
  };

  const factRows = caseData
    ? [
        ['Complaint Type', caseData.complaint_type],
        ['Product / Service', caseData.product_or_service],
        ['Seller / Platform', caseData.seller_or_platform],
        ['Amount Paid', caseData.amount_paid],
        ['Order Date', caseData.order_date],
        ['Delivery Date', caseData.delivery_date],
        ['Issue Date', caseData.issue_date],
        ['Payment Method', caseData.payment_method],
        ['Requested Resolution', caseData.resolution_requested]
      ].filter((item): item is [string, string] => Boolean(item[1]))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-200">

      <div className="lg:col-span-2 flex flex-col h-[700px] bg-white rounded-2xl border border-nyaya-cream-dark shadow-warm overflow-hidden">

        <div className="p-4 sm:p-5 border-b border-slate-100 bg-nyaya-cream-light flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-nyaya-plum flex items-center justify-center text-nyaya-orange shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif text-nyaya-plum">
                Nyaya Legal Intake Guide
              </h3>
              <p className="text-[11px] text-nyaya-text-secondary">
                AI-assisted fact extraction for Indian consumer grievances
              </p>
            </div>
          </div>

          <div className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Live API
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-nyaya-cream/40">
          {messages.map(message => {
            const isUser = message.sender === 'user';

            return (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                    isUser
                      ? 'bg-nyaya-orange text-white'
                      : 'bg-nyaya-plum text-nyaya-yellow'
                  }`}
                >
                  {isUser ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isUser
                      ? 'bg-nyaya-plum text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-nyaya-plum rounded-tl-none border border-slate-200/80 shadow-warm'
                  }`}
                >
                  <p>{message.content}</p>

                  {message.extractedFacts &&
                    message.extractedFacts.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-nyaya-orange tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          Extracted Case Metadata
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {message.extractedFacts.map((fact, index) => (
                            <div
                              key={index}
                              className="p-2 rounded bg-nyaya-cream border border-nyaya-cream-dark"
                            >
                              <span className="text-[10px] text-slate-400 block uppercase font-medium">
                                {fact.label}
                              </span>
                              <span className="font-semibold text-nyaya-plum">
                                {fact.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="text-[10px] mt-2 text-right text-slate-400">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2 bg-white rounded-xl w-fit border border-slate-200">
              <Loader2 className="w-4 h-4 text-nyaya-orange animate-spin" />
              Analyzing your complaint...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          {error && (
            <div className="mb-3 flex items-start gap-2 text-xs text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Describe your product, purchase, issue and refund request..."
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              disabled={isTyping}
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-nyaya-orange bg-nyaya-cream-light disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-nyaya-orange hover:bg-nyaya-orange-hover disabled:opacity-40 text-white text-xs font-semibold shadow-orange-sm transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Analyze</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-nyaya-cream-dark p-6 shadow-warm">

          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-nyaya-orange" />
              <h4 className="text-sm font-bold font-serif text-nyaya-plum">
                Live Case Fact Sheet
              </h4>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {caseData ? 'Extracted' : 'Awaiting input'}
            </span>
          </div>

          {caseData ? (
            <div className="space-y-3.5 text-xs">
              {factRows.map(([label, value]) => (
                <div key={label} className="pt-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-400 block font-medium uppercase text-[10px]">
                    {label}
                  </span>
                  <span className="font-semibold text-nyaya-plum">
                    {value}
                  </span>
                </div>
              ))}

              <div className="pt-3">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">
                  Missing Information
                </span>
                {caseData.missing_information.length > 0 ? (
                  <ul className="list-disc pl-4 mt-2 space-y-1 text-amber-700">
                    {caseData.missing_information.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-emerald-700">
                    No missing information flagged.
                  </p>
                )}
              </div>

              <div className="text-[10px] text-slate-500 pt-2">
                Processing mode: {caseData.processing_mode}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 leading-relaxed">
              Your extracted complaint details will appear here after you
              submit your first description.
            </p>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={onProceedToSummary}
              disabled={!caseData}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-nyaya-plum hover:bg-nyaya-plum-light disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span>View Case Brief & Timeline</span>
              <ArrowRight className="w-4 h-4 text-nyaya-yellow" />
            </button>
          </div>
        </div>

        <div className="bg-nyaya-cream-light rounded-2xl border border-nyaya-cream-dark p-5 text-xs text-nyaya-text-secondary space-y-3">
          <div className="flex items-center gap-2 text-nyaya-plum font-bold font-serif text-sm">
            <ShieldAlert className="w-4 h-4 text-nyaya-orange" />
            Why Accurate Intake Matters
          </div>
          <p className="leading-relaxed">
            Accurate dates, payment details and supporting documents help
            organize a consumer grievance. Review all extracted information
            before relying on it. Nyaya AI does not replace a qualified lawyer.
          </p>
        </div>
      </div>
    </div>
  );
};

